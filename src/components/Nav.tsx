import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../content'
import { MagneticButton } from './MagneticButton'
import { easeOutExpo, springSoft } from '../motion'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -28, opacity: 0, filter: 'blur(8px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <motion.div
        layout
        animate={{
          backgroundColor: scrolled || open ? 'hsla(224, 55%, 6%, 0.72)' : 'hsla(224, 55%, 6%, 0)',
          borderColor: scrolled || open ? 'hsla(210, 25%, 100%, 0.06)' : 'hsla(210, 25%, 100%, 0)',
          boxShadow: scrolled || open
            ? '0 8px 40px hsla(224, 55%, 2%, 0.55)'
            : '0 0 0 hsla(224, 55%, 2%, 0)',
          backdropFilter: scrolled || open ? 'blur(18px) saturate(1.35)' : 'blur(0px)',
        }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 sm:px-5"
        style={{ WebkitBackdropFilter: scrolled || open ? 'blur(18px) saturate(1.35)' : 'blur(0px)' }}
      >
        <motion.a
          href="#top"
          className="group flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springSoft}
        >
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary ring-1 ring-primary/25"
            whileHover={{ scale: 1.08, boxShadow: '0 0 18px hsla(199, 96%, 58%, 0.35)' }}
            transition={springSoft}
          >
            J
          </motion.span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-text">
            {site.name}
          </span>
        </motion.a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: easeOutExpo }}
              className="group relative flex min-h-11 items-center rounded-lg px-3 py-2 text-[13px] lg:min-h-0 font-medium text-muted transition hover:bg-white/[0.04] hover:text-text"
              whileHover={{ y: -1 }}
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-primary shadow-[0_0_8px_hsla(199,96%,58%,0.65)] transition duration-300 ease-out group-hover:scale-x-100" />
            </motion.a>
          ))}
          <MagneticButton
            href="#contact"
            className="ml-2 rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-semibold text-bg shadow-[0_0_14px_0_hsla(199,96%,58%,0.28)]"
          >
            Hire me
          </MagneticButton>
        </nav>

        <motion.button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition hover:bg-white/[0.05] hover:text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35, ease: easeOutExpo }}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-white/[0.04] hover:text-text"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35, ease: easeOutExpo }}
              className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-bg shadow-[0_0_20px_hsla(199,96%,58%,0.35)]"
            >
              Hire me
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
