import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, type RefObject } from 'react'

const springCfg = { stiffness: 140, damping: 30, mass: 0.4, restDelta: 0.001 }

/**
 * Scroll-linked reveal.
 * Progress 0: element's top meets the viewport bottom.
 * Progress 1: element's top meets 70% down the viewport.
 * Scrolling up through that band visibly reverses the motion.
 * Elements that have risen above the 70% line stay fully shown.
 */
export function useRewindPop(stagger = 0) {
  const ref = useRef<HTMLElement | null>(null)
  const reduce = !!useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 70%'],
  })
  const progress = useSpring(scrollYProgress, springCfg)
  const start = Math.min(Math.max(stagger, 0), 0.35)
  const opacity = useTransform(progress, [start, 1], [0, 1])
  const y = useTransform(progress, [start, 1], [reduce ? 0 : 40, 0])
  const scale = useTransform(progress, [start, 1], [reduce ? 1 : 0.96, 1])

  return {
    ref: ref as RefObject<never>,
    style: reduce ? { opacity } : { opacity, y, scale },
    progress,
  }
}
