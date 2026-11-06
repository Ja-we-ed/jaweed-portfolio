import { chromium } from 'playwright'
import fs from 'node:fs'

const BASE = process.env.POP_URL || 'http://127.0.0.1:4173'

function parseTransform(transform) {
  if (!transform || transform === 'none') return { tx: 0, ty: 0, scaleX: 1, scaleY: 1, raw: 'none' }
  const m = transform.match(/matrix\(([^)]+)\)/)
  if (m) {
    const p = m[1].split(',').map((n) => Number.parseFloat(n.trim()))
    return { tx: p[4] || 0, ty: p[5] || 0, scaleX: p[0], scaleY: p[3], raw: transform }
  }
  const m3 = transform.match(/matrix3d\(([^)]+)\)/)
  if (m3) {
    const p = m3[1].split(',').map((n) => Number.parseFloat(n.trim()))
    return { tx: p[12] || 0, ty: p[13] || 0, scaleX: p[0], scaleY: p[5], raw: transform }
  }
  return { tx: 0, ty: 0, scaleX: 1, scaleY: 1, raw: transform }
}

async function collect(page) {
  return page.evaluate(() => {
    const vh = window.innerHeight
    return [...document.querySelectorAll('[data-pop]')].map((el) => {
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      return {
        id: el.getAttribute('data-pop'),
        opacity: Number.parseFloat(cs.opacity),
        transform: cs.transform,
        filter: cs.filter,
        top: r.top,
        bottom: r.bottom,
        height: r.height,
        below: r.top >= vh - 4,
        inView: r.bottom > 8 && r.top < vh - 8,
      }
    })
  })
}

function sectionOf(id) {
  if (id.startsWith('about')) return 'About'
  if (id.startsWith('pipeline')) return 'Circuit'
  if (id.startsWith('skill')) return 'Skills'
  if (id.startsWith('project')) return 'Projects'
  if (id.startsWith('trusted')) return 'Toolkit'
  if (id.startsWith('story')) return 'Story'
  if (id.startsWith('education')) return 'Education'
  if (id.startsWith('contact')) return 'Contact'
  return 'Other'
}

function hiddenEnough(item, reduced) {
  if (item.opacity > 0.2) return false
  if (reduced) return true
  const t = parseTransform(item.transform)
  const blurred = item.filter && item.filter.includes('blur') && !item.filter.includes('blur(0')
  return Math.abs(t.ty) >= 8 || t.scaleX < 0.98 || blurred
}

function settledEnough(item, reduced) {
  if (item.opacity < 0.92) return false
  const t = parseTransform(item.transform)
  if (reduced) return Math.abs(t.ty) < 4
  return Math.abs(t.ty) < 4 && t.scaleX > 0.98
}

async function waitSettled(page, ids, timeout = 2500) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const snap = await collect(page)
    const map = Object.fromEntries(snap.map((s) => [s.id, s]))
    if (ids.every((id) => map[id] && map[id].opacity >= 0.92)) return true
    await page.waitForTimeout(60)
  }
  return false
}

async function slowScrollPass(page, reduced) {
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(550)
  const initial = await collect(page)
  const before = {}
  for (const item of initial) before[item.id] = item

  const pending = new Set(initial.filter((i) => i.below).map((i) => i.id))
  const after = {}
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const vh = await page.evaluate(() => window.innerHeight)

  for (let y = 0; y <= height; y += 120) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(40)
    const snap = await collect(page)
    const entering = snap.filter((s) => pending.has(s.id) && s.top < vh * 0.82)
    if (!entering.length) continue
    const ids = entering.map((s) => s.id)
    await waitSettled(page, ids, 2200)
    const later = await collect(page)
    for (const s of later) {
      if (ids.includes(s.id)) {
        after[s.id] = s
        pending.delete(s.id)
      }
    }
  }

  // leftover: force into view
  for (const id of [...pending]) {
    await page.locator(`[data-pop="${id}"]`).evaluate((el) => {
      el.scrollIntoView({ block: 'center', behavior: 'instant' })
    })
    await waitSettled(page, [id], 2200)
    const later = await collect(page)
    after[id] = later.find((s) => s.id === id)
    pending.delete(id)
  }

  // already-in-view on load
  for (const item of initial) {
    if (!item.below && !after[item.id]) {
      await waitSettled(page, [item.id], 1500)
      const later = (await collect(page)).find((s) => s.id === item.id)
      after[item.id] = later
    }
  }

  const rows = initial.map((item) => {
    const b = before[item.id]
    const a = after[item.id]
    const startedBelow = b.below
    const hiddenOk = startedBelow ? hiddenEnough(b, reduced) : true
    const visibleOk = a ? settledEnough(a, reduced) : false
    const pass = hiddenOk && visibleOk
    return {
      id: item.id,
      section: sectionOf(item.id),
      startedBelow,
      beforeOpacity: Number(b.opacity.toFixed(3)),
      beforeTransform: parseTransform(b.transform),
      afterOpacity: a ? Number(a.opacity.toFixed(3)) : null,
      afterTransform: a ? parseTransform(a.transform) : null,
      hiddenOk,
      visibleOk,
      pass,
      note: startedBelow ? '' : 'in-view-on-load',
    }
  })
  return rows
}

async function midpageReload(page, reduced) {
  await page.goto(`${BASE}/#projects`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1100)
  const snap = await collect(page)
  const inView = snap.filter((s) => s.inView)
  const stuck = inView.filter((s) => s.opacity < 0.9)
  return {
    inView: inView.map((s) => s.id),
    stuck: stuck.map((s) => ({ id: s.id, opacity: s.opacity })),
    pass: stuck.length === 0 && inView.length > 0,
  }
}

async function jumpBottomThenUp(page, reduced) {
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(400)
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = height; y >= 0; y -= 160) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(50)
  }
  await page.waitForTimeout(900)
  const snap = await collect(page)
  // After traveling the whole page upward, every element should have been seen
  const hidden = snap.filter((s) => s.opacity < 0.9)
  return {
    total: snap.length,
    hidden: hidden.map((s) => ({ id: s.id, opacity: s.opacity })),
    pass: hidden.length === 0 && snap.length > 0,
  }
}

async function runViewport(browser, viewport, reduced) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('[data-pop]')
  await page.waitForTimeout(500)

  const slow = await slowScrollPass(page, reduced)
  const mid = await midpageReload(page, reduced)
  const jump = await jumpBottomThenUp(page, reduced)

  await context.close()
  return { viewport, reduced, slow, mid, jump }
}

function summarize(run) {
  const bySec = {}
  for (const row of run.slow) {
    bySec[row.section] ||= { total: 0, pass: 0, fail: [] }
    bySec[row.section].total += 1
    if (row.pass) bySec[row.section].pass += 1
    else bySec[row.section].fail.push(row.id)
  }
  return bySec
}

const browser = await chromium.launch({ headless: true })
const report = []
try {
  report.push(await runViewport(browser, { width: 1440, height: 900 }, false))
  report.push(await runViewport(browser, { width: 375, height: 812 }, false))
  report.push(await runViewport(browser, { width: 1440, height: 900 }, true))
} finally {
  await browser.close()
}

const out = { generatedAt: new Date().toISOString(), report: report.map((run) => ({
  viewport: run.viewport,
  reduced: run.reduced,
  sections: summarize(run),
  mid: run.mid,
  jump: run.jump,
  slow: run.slow,
})) }

fs.writeFileSync('/tmp/scroll-pop-results.json', JSON.stringify(out, null, 2))

for (const run of out.report) {
  const label = `${run.viewport.width}x${run.viewport.height} reduced=${run.reduced}`
  console.log('\n==== ' + label + ' ====')
  console.log('section\tpass\ttotal\tfails')
  for (const [sec, info] of Object.entries(run.sections)) {
    console.log(`${sec}\t${info.pass}/${info.total}\t${info.fail.join(',') || '-'}`)
  }
  console.log('midpage reload:', run.mid.pass ? 'PASS' : 'FAIL', 'stuck', JSON.stringify(run.mid.stuck), 'inView', run.mid.inView.join(','))
  console.log('jump bottom+up:', run.jump.pass ? 'PASS' : 'FAIL', 'hidden', JSON.stringify(run.jump.hidden))
}

const anyFail = out.report.some((run) => {
  const secFail = Object.values(run.sections).some((s) => s.pass !== s.total)
  return secFail || !run.mid.pass || !run.jump.pass
})
console.log('\nOVERALL', anyFail ? 'FAIL' : 'PASS')
process.exit(anyFail ? 1 : 0)
