import type { MouseEventHandler, ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { springPop } from '../motion'

export function MagneticButton({
  href,
  children,
  className = '',
  onClick,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  ariaLabel?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 })

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.32)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.38)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 14px 40px hsla(199, 96%, 58%, 0.45)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={springPop}
    >
      {children}
    </motion.a>
  )
}
