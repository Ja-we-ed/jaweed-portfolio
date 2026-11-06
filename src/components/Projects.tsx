import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { animate, motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, MousePointer2 } from 'lucide-react'
import {
  projectFilters,
  projects,
  type ProjectFilter,
  type ProjectItem,
  type ProjectStatus,
} from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { easeOutExpo } from '../motion'
import { useRewindPop } from '../useRewindPop'

function statusTone(status: ProjectStatus) {
  if (status === 'Building') return 'text-primary'
  if (status === 'Shipped') return 'text-emerald-300'
  return 'text-muted'
}

function wrapX(value: number, width: number) {
  if (width <= 0) return value
  let next = value % width
  if (next > 0) next -= width
  // Keep exact negative copy-widths at -width instead of 0. Mapping
  // them to 0 undoes the prev-arrow seam teleport and makes the
  // following animate() sweep across the whole track.
  if (next === 0 && value < 0) return -width
  return next
}

function ProjectSlide({ item, listed = true }: { item: ProjectItem; listed?: boolean }) {
  const comingSoon = !item.href

  return (
    <article
      data-reel-id={item.id}
      data-project-card={listed ? item.id : undefined}
      data-pop={listed ? `project-card-${item.id}` : undefined}
      className="group w-[80vw] max-w-[360px] flex-none overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:w-[360px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.05rem] bg-bg-elevated">
        <img
          src={item.image}
          alt={item.imageAlt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover brightness-[1.06] contrast-[1.04] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/15" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            Case {item.id}
          </span>
          <span
            className={`rounded-full border border-white/10 bg-black/35 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] backdrop-blur ${statusTone(item.status)}`}
          >
            {item.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <span className="max-w-[75%] rounded-lg bg-primary px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-bg">
            {item.role}
          </span>
          {comingSoon ? (
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/35 text-white/80 backdrop-blur">
              <ArrowUpRight size={16} />
            </span>
          ) : (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${item.title}`}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition-colors group-hover:border-primary/50 group-hover:text-primary"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
      <div className="px-4 pb-5 pt-5 sm:px-5">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-text">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-xs leading-6 text-muted">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/70 px-2 py-0.5 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
          {comingSoon && (
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const header = useRewindPop()
  const reel = useRewindPop()
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [paused, setPaused] = useState(false)
  const [reelIndex, setReelIndex] = useState(0)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const modeRef = useRef<'drift' | 'hover' | 'drag' | 'inertia' | 'nudge'>('drift')
  const speedRef = useRef(-0.038)
  const velRef = useRef(0)
  const copyRef = useRef<HTMLDivElement>(null)
  const widthRef = useRef(0)
  const stepRef = useRef(376)
  const nudgeAnim = useRef<ReturnType<typeof animate> | null>(null)
  const pointerRef = useRef<{
    id: number
    lastX: number
    lastY: number
    lastT: number
    axis: 'x' | 'y' | null
    active: boolean
  } | null>(null)

  const driftSpeed = -0.038

  const visible = useMemo(() => {
    if (filter === 'All') return projects.items
    return projects.items.filter((item) => item.category === filter)
  }, [filter])

  useLayoutEffect(() => {
    const copy = copyRef.current
    if (!copy) return
    const measure = () => {
      const first = copy.querySelector<HTMLElement>('[data-reel-id]')
      if (first) stepRef.current = first.offsetWidth + 16
      // Wrap period is exactly N card steps so arrows never treat the last
      // card as a seam and reverse-sweep back to the start.
      const count = copy.querySelectorAll('[data-reel-id]').length
      widthRef.current = stepRef.current * Math.max(count, 1)
      x.set(wrapX(x.get(), widthRef.current))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(copy)
    return () => observer.disconnect()
  }, [visible, x])

  useEffect(() => {
    x.set(0)
    speedRef.current = reduce ? 0 : driftSpeed
    modeRef.current = 'drift'
    nudgeAnim.current?.stop()
    nudgeAnim.current = null
  }, [filter, x, reduce])

  const stopNudge = () => {
    nudgeAnim.current?.stop()
    nudgeAnim.current = null
    if (widthRef.current > 0) x.set(wrapX(x.get(), widthRef.current))
  }

  useAnimationFrame((_, delta) => {
    const width = widthRef.current
    if (width <= 0 || visible.length < 2) return
    const dt = Math.min(delta, 40)

    if (modeRef.current === 'drag' || modeRef.current === 'nudge') return

    if (modeRef.current === 'inertia') {
      velRef.current *= Math.pow(0.0016, dt / 1000)
      x.set(wrapX(x.get() + velRef.current * dt, width))
      if (Math.abs(velRef.current) < 0.016) {
        modeRef.current = paused || reduce ? 'hover' : 'drift'
        speedRef.current = velRef.current
      }
      return
    }

    if (reduce) {
      x.set(wrapX(x.get(), width))
      return
    }

    const target = modeRef.current === 'hover' || paused ? 0 : driftSpeed
    const ease = target === 0 ? 0.008 : 0.0035
    speedRef.current += (target - speedRef.current) * Math.min(1, dt * ease)
    if (Math.abs(speedRef.current) < 0.0004 && target === 0) speedRef.current = 0
    x.set(wrapX(x.get() + speedRef.current * dt, width))
  })

  useMotionValueEvent(x, 'change', (latest) => {
    const step = stepRef.current
    const n = visible.length
    if (step <= 0 || n <= 0) return
    const period = step * n
    const wrapped = wrapX(latest, period)
    const raw = Math.round(-wrapped / step)
    const nextIndex = ((raw % n) + n) % n
    setReelIndex((prev) => (prev === nextIndex ? prev : nextIndex))
  })

  const nudge = (direction: number) => {
    const step = stepRef.current
    const n = visible.length
    if (step <= 0 || n < 2) return
    const width = step * n
    widthRef.current = width
    stopNudge()
    modeRef.current = 'nudge'
    // Always travel exactly one card. Teleport by a full copy only when
    // that keeps the animation pointed the right way — never wrap the
    // target onto 0, which would reverse-sweep across the track.
    let from = wrapX(x.get(), width)
    const target = from - direction * step
    if (target > 0) {
      from -= width
    }
    const dest = from - direction * step
    x.set(from)
    const finishNudge = () => {
      x.set(wrapX(x.get(), widthRef.current || width))
      nudgeAnim.current = null
      modeRef.current = paused || reduce ? 'hover' : 'drift'
    }
    // Animate the numbers themselves so a seam teleport cannot get
    // interpolated from the previous x (which would sweep the track).
    const controls = animate(from, dest, {
      type: 'spring',
      stiffness: 300,
      damping: 36,
      mass: 0.65,
      onUpdate: (value) => x.set(value),
      onComplete: finishNudge,
    })
    nudgeAnim.current = controls
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    stopNudge()
    pointerRef.current = {
      id: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
      lastT: performance.now(),
      axis: null,
      active: true,
    }
    modeRef.current = 'drag'
    velRef.current = 0
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      /* already captured */
    }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || !pointer.active || pointer.id !== event.pointerId) return
    const dx = event.clientX - pointer.lastX
    const dy = event.clientY - pointer.lastY
    if (!pointer.axis) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return
      pointer.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (pointer.axis === 'y') {
        pointer.active = false
        modeRef.current = paused || reduce ? 'hover' : 'drift'
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          /* not captured */
        }
        return
      }
    }
    if (pointer.axis !== 'x') return
    event.preventDefault()
    const now = performance.now()
    const dt = Math.max(now - pointer.lastT, 1)
    velRef.current = dx / dt
    pointer.lastX = event.clientX
    pointer.lastY = event.clientY
    pointer.lastT = now
    x.set(wrapX(x.get() + dx, widthRef.current))
  }

  const endPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    const dragged = pointer.axis === 'x' && pointer.active
    pointer.active = false
    pointerRef.current = null
    if (dragged && Math.abs(velRef.current) > 0.02) {
      modeRef.current = 'inertia'
    } else {
      modeRef.current = paused || reduce ? 'hover' : 'drift'
    }
  }

  return (
    <section id="projects" className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="projects-header"
          style={header.style}
          className="mb-8 max-w-2xl"
        >
          <Eyebrow>{projects.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {projects.title}
          </RevealHeading>
          <p className="mt-3 text-[15px] text-muted">{projects.subtitle}</p>
        </motion.div>

        <div
          role="tablist"
          aria-label="Filter projects"
          className="mb-8 flex flex-wrap gap-2"
        >
          {projectFilters.map((item) => {
            const selected = filter === item
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(item)}
                className={`relative min-h-10 rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  selected
                    ? 'text-bg'
                    : 'border border-border text-muted hover:border-primary/35 hover:text-text'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={reduce ? undefined : 'project-filter'}
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            )
          })}
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            <MousePointer2 size={14} className="text-primary" />
            Project reel · drag
          </p>
          {visible.length > 1 && (
            <div className="flex items-center gap-3">
              <p
                data-reel-index={reelIndex}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                aria-live="polite"
              >
                {String(reelIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                aria-label="Previous project"
                data-project-prev
                onClick={() => nudge(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-bg/80 text-muted transition hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                data-project-next
                onClick={() => nudge(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-bg/80 text-muted transition hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <motion.div
        ref={reel.ref}
        data-projects-reel
        data-reel-index={reelIndex}
        tabIndex={0}
        style={reel.style}
        className="relative outline-none"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            nudge(1)
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault()
            nudge(-1)
          }
        }}
        onMouseEnter={() => {
          setPaused(true)
          if (modeRef.current === 'drift') modeRef.current = 'hover'
        }}
        onMouseLeave={() => {
          setPaused(false)
          if (modeRef.current === 'hover') modeRef.current = 'drift'
        }}
      >
        <div className="project-mask-x overflow-hidden [touch-action:pan-y]">
          <motion.div
            data-reel-track
            className="flex w-max cursor-grab select-none active:cursor-grabbing"
            style={{ x, touchAction: 'pan-y' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
          >
            <div ref={copyRef} data-reel-copy className="flex shrink-0 gap-4 pr-4">
              {visible.map((item) => (
                <ProjectSlide key={`a-${item.id}`} item={item} listed />
              ))}
            </div>
            {visible.length > 1 && (
              <>
                <div className="flex shrink-0 gap-4 pr-4" aria-hidden inert>
                  {visible.map((item) => (
                    <ProjectSlide key={`b-${item.id}`} item={item} listed={false} />
                  ))}
                </div>
                <div className="flex shrink-0 gap-4 pr-4" aria-hidden inert>
                  {visible.map((item) => (
                    <ProjectSlide key={`c-${item.id}`} item={item} listed={false} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
