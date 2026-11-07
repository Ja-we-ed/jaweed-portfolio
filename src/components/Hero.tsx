import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowDownRight, MapPin, Sparkles } from 'lucide-react'
import { hero, site } from '../content'
import { MediaPlaceholders } from './MediaPlaceholders'
import { MagneticButton } from './MagneticButton'
import {
  childFadeUp,
  easeOutExpo,
  kineticLetter,
  kineticWord,
  hoverOff,
  springPop,
  springSoft,
  staggerContainer,
} from '../motion'

const SIGNATURE = 'JAWEED'
const BUILD = 'BUILD'

function KineticWord({
  word,
  className,
  gradient = false,
}: {
  word: string
  className?: string
  gradient?: boolean
}) {
  return (
    <motion.span
      variants={kineticWord}
      initial="hidden"
      animate="show"
      className={`inline-flex overflow-hidden ${className ?? ''}`}
      style={{ perspective: 600 }}
      aria-label={word}
    >
      {word.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={kineticLetter}
          className={`inline-block ${gradient ? 'text-gradient' : ''}`}
          style={{ transformOrigin: '50% 100%' }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="grid-glow relative overflow-hidden pb-28 pt-28 sm:pb-32 sm:pt-32 lg:pb-36 lg:pt-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={childFadeUp} className="mb-5 flex flex-wrap items-center gap-2.5">
            <motion.span
              className="relative inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-[12px] before:absolute before:-inset-y-2 before:inset-x-0 before:content-[''] font-medium text-primary"
              whileHover={{ scale: 1.03, borderColor: 'hsla(199, 96%, 58%, 0.45)' }}
              transition={springSoft}
            >
              <motion.span
                animate={reduce ? undefined : { rotate: [0, 12, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
                className="inline-flex"
              >
                <Sparkles size={12} />
              </motion.span>
              {site.availability}
            </motion.span>
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[12px] text-muted"
              whileHover={{ borderColor: 'hsla(210, 25%, 30%, 1)' }}
            >
              <MapPin size={12} className="text-muted-dim" />
              {site.location}
            </motion.span>
            <motion.a
              href="#ai"
              className="relative inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-[12px] before:absolute before:-inset-y-2 before:inset-x-0 before:content-[''] font-medium text-primary"
              whileHover={{ scale: 1.03, borderColor: 'hsla(199, 96%, 58%, 0.5)' }}
              transition={springSoft}
            >
              AI-native · Python · C
            </motion.a>
          </motion.div>

          <motion.p
            variants={childFadeUp}
            className="mb-3 inline-flex items-center gap-2 font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.24em] text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {hero.eyebrow}
          </motion.p>

          {/* Kinetic signature — louder than calm glass */}
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <KineticWord
              word={SIGNATURE}
              className="font-display text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[0.95] tracking-tight text-text"
            />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.45, ease: easeOutExpo }}
              className="font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.28em] text-primary/80"
            >
              ·
            </motion.span>
            <KineticWord
              word={BUILD}
              gradient
              className="font-display text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[0.95] tracking-tight"
            />
          </div>

          <motion.h1
            variants={childFadeUp}
            className="font-display text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-[1.2] tracking-tight text-muted"
          >
            Building software that{' '}
            <span className="text-text">earns trust.</span>
          </motion.h1>

          <motion.p
            variants={childFadeUp}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {hero.subhead}
          </motion.p>

          <motion.div variants={childFadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_18px_0_hsla(199,96%,58%,0.22)]"
            >
              {hero.primaryCta.label}
              <motion.span
                className="inline-flex"
                animate={reduce ? undefined : { x: [0, 2, 0], y: [0, 2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
              >
                <ArrowDownRight size={16} />
              </motion.span>
            </MagneticButton>
            <motion.a
              href={hero.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text"
              whileHover={{
                scale: 1.04,
                y: -2,
                borderColor: 'hsla(199, 96%, 58%, 0.45)',
                backgroundColor: 'hsla(199, 96%, 58%, 0.08)',
                boxShadow: '0 0 24px hsla(199, 96%, 58%, 0.18)',
                transition: springPop,
              }}
              whileTap={{ scale: 0.98 }}
              transition={hoverOff}
            >
              {hero.secondaryCta.label}
            </motion.a>
          </motion.div>

          <motion.div
            variants={childFadeUp}
            className="mt-10 grid grid-cols-3 items-stretch gap-3 sm:max-w-md"
            style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
          >
            {hero.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="h-full min-w-0"
                initial={{ opacity: 0, y: 22, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.55 + i * 0.08,
                  duration: 0.6,
                  ease: easeOutExpo,
                }}
              >
                <motion.div
                  data-hover-glow="metric"
                  className="flex h-full min-h-[6rem] w-full min-w-0 flex-col rounded-2xl border border-border bg-bg-card/80 px-3 py-3.5 sm:min-h-[6rem] sm:px-4"
                  whileHover={{
                    y: -6,
                    borderColor: 'hsla(199, 96%, 58%, 0.45)',
                    backgroundColor: 'hsla(199, 96%, 58%, 0.1)',
                    boxShadow: '0 18px 44px hsla(199, 96%, 58%, 0.18)',
                    transition: springPop,
                  }}
                  transition={hoverOff}
                >
                  <p className="truncate font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
                    {m.value}
                  </p>
                  <p className="mt-1 line-clamp-2 font-mono text-[12px] sm:text-[10px] uppercase leading-tight tracking-[0.14em] text-muted">
                    {m.label}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0.08 : 0.22, duration: reduce ? 0.4 : 0.9, ease: easeOutExpo }}
          className="w-full min-w-0"
        >
          <MediaPlaceholders />
        </motion.div>
      </div>

      {/* Scroll cue — bounce once, then soften */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-4 left-1/2 flex min-h-11 min-w-11 -translate-x-1/2 flex-col items-center justify-center gap-1.5 p-2 text-muted sm:bottom-6 sm:p-0"
        initial={{ opacity: 0, y: -8 }}
        animate={
          reduce
            ? { opacity: 0.55, y: 0 }
            : {
                opacity: [0, 0.85, 0.55],
                y: [0, 10, 0, 6, 0],
              }
        }
        transition={
          reduce
            ? { delay: 1.1, duration: 0.5 }
            : {
                delay: 1.15,
                duration: 1.6,
                times: [0, 0.35, 0.55, 0.8, 1],
                ease: easeOutExpo,
              }
        }
        whileHover={{ color: 'hsl(199 96% 58%)', y: 2 }}
      >
        <span className="font-mono text-[12px] sm:text-[10px] uppercase tracking-[0.22em]">Scroll</span>
        <ArrowDown size={14} className="opacity-70" />
      </motion.a>
    </section>
  )
}
