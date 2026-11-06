import { motion } from 'framer-motion'
import { education } from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { hoverOff, springPop } from '../motion'
import { useRewindPop } from '../useRewindPop'

type EduItem = (typeof education.items)[number]

function EducationItem({ item, i }: { item: EduItem; i: number }) {
  const row = useRewindPop(i * 0.05)
  const dot = useRewindPop(0.08 + i * 0.05)
  return (
    <motion.li
      ref={row.ref}
      data-pop={`education-item-${i}`}
      style={row.style}
      className="relative grid gap-3 pb-10 pl-8 last:pb-0 sm:grid-cols-[160px_1fr] sm:gap-8 sm:pl-10"
    >
      <motion.span
        ref={dot.ref}
        style={dot.style}
        className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 ${
          item.current
            ? 'border-primary bg-primary shadow-[0_0_16px_hsl(199_96%_58%/0.55)]'
            : 'border-border-strong bg-bg'
        }`}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {item.period}
      </p>
      <motion.div
        data-hover-glow="education"
        whileHover={{
          y: -4,
          borderColor: 'hsla(199, 96%, 58%, 0.35)',
          boxShadow: '0 14px 32px hsla(199, 96%, 58%, 0.1)',
          transition: springPop,
        }}
        transition={hoverOff}
        className="rounded-2xl border border-border bg-bg-card/80 p-5"
      >
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-semibold tracking-tight text-text">
            {item.org}
          </h3>
          {item.current && (
            <span className="rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
              Current
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-primary/90">{item.role}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.detail}</p>
      </motion.div>
    </motion.li>
  )
}

export function Education() {
  const header = useRewindPop()
  const line = useRewindPop()

  return (
    <section id="education" className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="education-header"
          style={header.style}
          className="mb-12 max-w-2xl"
        >
          <Eyebrow>{education.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {education.title}
            </RevealHeading>
        </motion.div>

        <div className="relative">
          <motion.div
            ref={line.ref}
            style={{ scaleY: line.style.opacity }}
            className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-primary/50 via-border to-transparent sm:left-[9px]"
          />
        <ol className="relative space-y-0">
          {education.items.map((item, i) => (
            <EducationItem key={item.org} item={item} i={i} />
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
