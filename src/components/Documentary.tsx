import { motion } from 'framer-motion'
import { documentary } from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { hoverOff, springPop } from '../motion'
import { useRewindPop } from '../useRewindPop'

type Chapter = (typeof documentary.chapters)[number]

function ChapterItem({ ch, i }: { ch: Chapter; i: number }) {
  const left = i % 2 === 0
  const pop = useRewindPop(i * 0.04)
  const node = useRewindPop(0.06 + i * 0.04)
  const bar = useRewindPop(0.1 + i * 0.04)
  return (
    <motion.article
      ref={pop.ref}
      data-pop={`story-chapter-${i}`}
      style={pop.style}
      className={`relative grid gap-4 sm:grid-cols-2 sm:gap-10 ${
        left ? '' : 'sm:[&>*:first-child]:order-2'
      }`}
    >
      <div
        className={`pl-10 sm:pl-0 ${left ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}
      >
        <div className="mb-2 flex items-center gap-2 sm:justify-start">
          <motion.span
            ref={node.ref}
            style={node.style}
            className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-bg shadow-[0_0_18px_hsla(199,96%,58%,0.45)] sm:left-1/2 sm:-translate-x-1/2"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
          </motion.span>
          <span className="font-mono text-[12px] sm:text-[10px] uppercase tracking-[0.22em] text-primary">
            Chapter {ch.chapter}
          </span>
          <span className="font-mono text-[12px] sm:text-[10px] uppercase tracking-[0.16em] text-muted-dim">
            · {ch.period}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {ch.title}
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{ch.body}</p>
      </div>
      <motion.div
        data-hover-glow="story"
        whileHover={{
          y: -6,
          borderColor: 'hsla(199, 96%, 58%, 0.4)',
          boxShadow: '0 18px 40px hsla(199, 96%, 58%, 0.12)',
          transition: springPop,
        }}
        transition={hoverOff}
        className={`hidden rounded-2xl border border-border bg-bg-card/60 p-5 sm:block ${
          left ? 'sm:ml-4' : 'sm:mr-4'
        }`}
      >
        <p className="font-mono text-[12px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-dim">
          Frame {ch.chapter}
        </p>
        <p className="mt-3 font-display text-lg font-semibold text-text/90">{ch.title}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            ref={bar.ref}
            style={{ ...bar.style, width: `${35 + i * 12}%`, transformOrigin: 'left center' }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </motion.article>
  )
}

export function Documentary() {
  const header = useRewindPop()

  return (
    <section id="story" className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="story-header"
          style={header.style}
          className="mb-14 max-w-2xl"
        >
          <Eyebrow>{documentary.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {documentary.title}
            </RevealHeading>
          <p className="mt-3 text-[15px] text-muted">{documentary.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-primary/70 via-border to-transparent sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-10 sm:space-y-14">
            {documentary.chapters.map((ch, i) => (
              <ChapterItem key={ch.chapter} ch={ch} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
