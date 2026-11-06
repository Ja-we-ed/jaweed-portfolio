import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { AINative } from './components/AINative'
import { Pipeline } from './components/Pipeline'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Trusted } from './components/Trusted'
import { Documentary } from './components/Documentary'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { easeOutExpo } from './motion'

const KNOWN_HASHES = new Set([
  '',
  '#',
  '#top',
  '#main',
  '#about',
  '#ai',
  '#pipeline',
  '#skills',
  '#projects',
  '#trusted',
  '#story',
  '#education',
  '#contact',
])

function useKnownHash() {
  useEffect(() => {
    const fix = () => {
      const hash = window.location.hash
      if (hash && !KNOWN_HASHES.has(hash)) {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        window.scrollTo({ top: 0 })
      }
    }
    fix()
    window.addEventListener('hashchange', fix)
    return () => window.removeEventListener('hashchange', fix)
  }, [])
}

export default function App() {
  const reduce = useReducedMotion()
  useKnownHash()

  return (
    <motion.div
      className="min-h-screen bg-bg text-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.35 : 0.45, ease: easeOutExpo }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <AINative />
        <Pipeline />
        <Skills />
        <Projects />
        <Trusted />
        <Documentary />
        <Education />
        <Contact />
      </main>
    </motion.div>
  )
}
