import type { Transition, Variants } from 'framer-motion'

/** Kaiser-like soft expo ease */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Punchier pop for scroll entrances */
export const easeOutBack: [number, number, number, number] = [0.34, 1.4, 0.64, 1]

export const viewportOnce = { once: true, margin: '-10% 0px -8% 0px' } as const

/** Reliable per-element scroll pop: low threshold, trigger a bit before the bottom edge. */
export const viewportPop = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -10% 0px',
} as const

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 28,
  mass: 0.7,
}

export const springPop: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 24,
  mass: 0.65,
}

/** Hover-out for glow/lift: drop the light quickly, never reuse entrance delay. */
export const hoverOff: Transition = {
  duration: 0.12,
  ease: 'easeOut',
}

/** Quick reverse when an element leaves through the bottom of the viewport. */
export const rewindOut: Transition = {
  duration: 0.35,
  ease: easeOutExpo,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, transition: rewindOut },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === 'number' ? i * 0.07 : 0,
      duration: 0.75,
      ease: easeOutExpo,
    },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0, transition: rewindOut },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

/** Section-level POP: scale + blur clear + slight Y rise */
export const sectionPop: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94,
    filter: 'blur(10px)',
    transition: rewindOut,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: easeOutExpo,
    },
  },
}

/** Child pop for staggered kids inside a section */
export const childPop: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.92,
    filter: 'blur(8px)',
    transition: rewindOut,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
}

/** Staggered scroll-pop for independently observed cards/tiles. */
export function popIn(delayIndex = 0): Variants {
  const delay = Math.min(delayIndex, 5) * 0.06
  return {
    hidden: {
      opacity: 0,
      y: 28,
      scale: 0.94,
      filter: 'blur(8px)',
      transition: rewindOut,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay,
        duration: 0.65,
        ease: easeOutExpo,
      },
    },
  }
}

/** Cards dealt from a stacked deck into their grid slots. */
export function dealIn(delayIndex = 0, tame = false): Variants {
  const delay = Math.min(delayIndex, 8) * (tame ? 0.04 : 0.055)
  const dir = delayIndex % 2 === 0 ? -1 : 1
  const spin = tame ? 4 : 9
  const lift = tame ? 28 : 52
  const nudge = tame ? 10 : 22
  return {
    hidden: {
      opacity: 0,
      x: dir * nudge,
      y: lift,
      rotate: dir * spin,
      scale: tame ? 0.94 : 0.88,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay,
        type: 'spring',
        stiffness: tame ? 300 : 340,
        damping: tame ? 26 : 22,
        mass: 0.7,
      },
    },
  }
}

/** Reduced-motion entrance: opacity only, nothing stays hidden. */
export function fadeInSoft(delayIndex = 0): Variants {
  const delay = Math.min(delayIndex, 5) * 0.04
  return {
    hidden: { opacity: 0, transition: rewindOut },
    show: {
      opacity: 1,
      transition: {
        delay,
        duration: 0.45,
        ease: easeOutExpo,
      },
    },
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.06,
    },
  },
}

/** ~40–80ms kids for scroll-pop sections */
export const staggerPop: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.04,
    },
  },
}

export const childFadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

export const childScaleIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

/** Kinetic letter for hero signature word */
export const kineticLetter: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    rotateX: 55,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
}

export const kineticWord: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.12,
    },
  },
}

/** Circuit node light-up in order */
export const circuitNode: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.86,
    filter: 'blur(6px)',
    transition: rewindOut,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: easeOutExpo,
    },
  },
}

export const circuitStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

/** Documentary chapter frame reveal */
export const chapterFrame: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.94,
    filter: 'blur(8px)',
    transition: rewindOut,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
}

export const chapterStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

/** Clip-path wipe for project images (top → bottom reveal) */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', transition: rewindOut },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, ease: easeOutExpo },
  },
}

/** Section heading rises out of a masked line */
export const headingReveal: Variants = {
  hidden: { y: '115%', transition: rewindOut },
  show: {
    y: '0%',
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}
