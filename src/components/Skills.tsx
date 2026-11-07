import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  siC,
  siExpress,
  siFigma,
  siGit,
  siJavascript,
  siLinux,
  siNodedotjs,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
  siCursor,
} from 'simple-icons'
import {
  skillFilters,
  skills,
  type SkillFilter,
  type SkillItem,
  type SkillLevel,
} from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { easeOutExpo, hoverOff, springSoft } from '../motion'
import { useRewindPop } from '../useRewindPop'

type BrandIcon = { title: string; hex: string; path: string }

const ICONS: Record<string, BrandIcon> = {
  C: siC,
  Python: siPython,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  'Node.js': siNodedotjs,
  'Tailwind CSS': siTailwindcss,
  Vite: siVite,
  Express: siExpress,
  Git: siGit,
  Linux: siLinux,
  'VS Code / Cursor': siCursor,
  Figma: siFigma,
  Postman: siPostman,
}

function brandHover(hex: string) {
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (luma < 0.18) return '#e8eef7'
  return `#${hex}`
}

function filledFor(level: SkillLevel) {
  if (level === 'Building with') return 3
  if (level === 'Comfortable') return 2
  return 1
}

function LevelPips({ level }: { level: SkillLevel }) {
  const filled = filledFor(level)
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-3.5 rounded-full ${i < filled ? 'bg-primary' : 'bg-border-strong'}`}
        />
      ))}
    </span>
  )
}

function SkillGlyph({ name }: { name: string }) {
  const icon = ICONS[name]
  if (!icon) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="fill-current">
        <path d="M4 7c0-1.4 3.6-2.6 8-2.6S20 5.6 20 7s-3.6 2.6-8 2.6S4 8.4 4 7zm0 5.2V14c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6v-1.8c-1.7 1.1-4.7 1.8-8 1.8s-6.3-.7-8-1.8zm0 5.1V19c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6v-1.7c-1.7 1.1-4.7 1.8-8 1.8s-6.3-.7-8-1.8z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="fill-current">
      <path d={icon.path} />
    </svg>
  )
}

function SkillTile({ item, index, reduce }: { item: SkillItem; index: number; reduce: boolean }) {
  const icon = ICONS[item.name]
  const featured = item.level === 'Building with'
  const tile = useRewindPop(index * 0.04)

  return (
    <motion.article
      ref={tile.ref}
      data-pop={`skill-tile-${index}`}
      style={tile.style}
      className="h-full"
    >
      <motion.div
        data-hover-glow="skill"
        className={`group flex h-full flex-col rounded-2xl border p-5 backdrop-blur-[7px] ${
          featured
            ? 'border-primary/45 bg-[rgba(8,36,46,0.42)] shadow-[inset_0_0_0_1px_hsla(199,96%,58%,0.14)]'
            : 'border-primary/22 bg-[rgba(8,20,28,0.38)]'
        }`}
        style={icon ? { ['--brand' as string]: brandHover(icon.hex) } : undefined}
        whileHover={
          reduce
            ? undefined
            : {
                y: -6,
                borderColor: 'hsla(199, 96%, 58%, 0.45)',
                boxShadow: '0 22px 48px hsla(199, 96%, 58%, 0.14)',
                transition: springSoft,
              }
        }
        transition={hoverOff}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="skill-glyph flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg/70 text-muted transition duration-300">
            <SkillGlyph name={item.name} />
          </span>
          <LevelPips level={item.level} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-semibold tracking-tight text-text">{item.name}</h3>
          <span className="rounded-full border border-border/80 px-2 py-0.5 font-mono text-[12px] sm:text-[10px] uppercase tracking-[0.14em] text-muted">
            {item.category}
          </span>
        </div>
        <p className="mt-1 font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.16em] text-primary">{item.level}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{item.use}</p>
      </motion.div>
    </motion.article>
  )
}

export function Skills() {
  const [filter, setFilter] = useState<SkillFilter>('All')
  const reduce = useReducedMotion()
  const header = useRewindPop()
  const legend = useRewindPop()

  const visible = useMemo(() => {
    if (filter === 'All') return skills.items
    return skills.items.filter((item) => item.category === filter)
  }, [filter])

  return (
    <section id="skills" className="relative scroll-mt-28 overflow-hidden border-t border-border/60 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div className="skill-orbit skill-orbit-a" />
        <div className="skill-orbit skill-orbit-b" />
        <div className="skill-orbit skill-orbit-c" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="skills-header"
          style={header.style}
          className="mb-8 max-w-2xl"
        >
          <Eyebrow>{skills.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {skills.title}
          </RevealHeading>
          <p className="mt-3 text-[15px] text-muted">{skills.subtitle}</p>
        </motion.div>

        <motion.ul
          ref={legend.ref}
          style={legend.style}
          className="mb-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2"
        >
          {skills.legend.map((row) => (
            <motion.li key={row.level} className="flex items-center gap-3 text-[13px]">
              <LevelPips level={row.level} />
              <span>
                <span className="font-medium text-text">{row.level}</span>
                <span className="text-muted"> — {row.meaning}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter skills">
          {skillFilters.map((item) => {
            const active = filter === item
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={`relative min-h-10 rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  active
                    ? 'text-bg'
                    : 'border border-border text-muted hover:border-primary/35 hover:text-text'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={reduce ? undefined : 'skill-filter'}
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            )
          })}
        </div>

        <div className="relative grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <SkillTile key={item.name} item={item} index={index} reduce={!!reduce} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
