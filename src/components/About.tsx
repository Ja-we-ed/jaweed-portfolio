import { motion } from 'framer-motion'
import { about } from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { hoverOff, springPop } from '../motion'
import { useRewindPop } from '../useRewindPop'

export function About() {
  const header = useRewindPop()
  const chips = useRewindPop()

  return (
    <section id="about" className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="about-header"
          style={header.style}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {about.title}
            </RevealHeading>
          </div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            {about.philosophy}
          </p>
        </motion.div>

        <motion.div
          ref={chips.ref}
          style={chips.style}
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {about.chips.map((chip) => (
            <motion.span key={chip} className="inline-flex">
              <motion.span
                data-hover-glow="about-chip"
                whileHover={{
                  y: -4,
                  scale: 1.04,
                  borderColor: 'hsla(199, 96%, 58%, 0.45)',
                  backgroundColor: 'hsla(199, 96%, 58%, 0.14)',
                  color: 'hsl(199 96% 58%)',
                  boxShadow: '0 10px 28px hsla(199, 96%, 58%, 0.18)',
                  transition: springPop,
                }}
                transition={hoverOff}
                className="cursor-default rounded-full border border-border bg-bg-card px-3.5 py-1.5 text-[13px] font-medium text-muted"
              >
                {chip}
              </motion.span>
            </motion.span>
          ))}
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {[
            { src: 'coding-class.webp', alt: 'Laptop with code open during a class', n: '02 / 03' },
            { src: 'office-floor.webp', alt: 'People working at desks in an open office', n: '03 / 03' },
          ].map((ph) => (
            <motion.div
              key={ph.src}
              whileHover={{ y: -4, transition: springPop }}
              transition={hoverOff}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.4rem] border border-border bg-bg-card shadow-[0_20px_60px_hsl(224_60%_2%/0.6)]"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/${ph.src}`}
                alt={ph.alt}
                width={736}
                height={552}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,hsl(224_55%_4%/0.4)_100%)]" />
              <span className="absolute left-3 top-3 rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[12px] sm:text-[10px] uppercase tracking-wider text-muted backdrop-blur">
                {ph.n}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
