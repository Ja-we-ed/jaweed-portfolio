import { Camera, Clapperboard } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { springSoft } from '../motion'

export function MediaPlaceholders() {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />

      <div className="grid w-full gap-4">
        <motion.div
          whileHover={reduce ? undefined : { y: -4, transition: springSoft }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] border border-border bg-bg-card shadow-[0_24px_80px_hsl(224_60%_2%/0.65)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(199_96%_58%/0.15),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(224_55%_4%/0.85)_100%)]" />

          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
            <span className="rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
              01 / 03
            </span>
            <span className="rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
              Portrait
            </span>
          </div>

          <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-3 p-6 pt-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary ring-1 ring-primary/20">
              <Camera size={24} strokeWidth={1.75} />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Photo coming soon
            </p>
            <p className="max-w-[16rem] text-sm text-muted">
              Portrait slot — a 4:3 frame like the reference, ready for a photo later.
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={reduce ? undefined : { y: -3, transition: springSoft }}
          className="relative aspect-video w-full overflow-hidden rounded-[1.6rem] border border-border bg-bg-elevated shadow-[0_20px_60px_hsl(224_60%_2%/0.7)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(199_96%_58%/0.12),transparent_60%)]" />

          <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full bg-bg/70 px-2.5 py-1 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Idle
              </span>
            </span>
            <span className="rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
              Reel
            </span>
          </div>

          <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-2 px-4 pb-4 pt-10 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-muted ring-1 ring-white/10">
              <Clapperboard size={18} strokeWidth={1.75} />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Field reel coming soon
            </p>
            <p className="max-w-[16rem] text-[13px] leading-relaxed text-muted">
              Cover video slot — 16:9 muted autoplay loop later.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
