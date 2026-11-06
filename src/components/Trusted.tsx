import { motion, useReducedMotion } from 'framer-motion'
import {
  siAndroid,
  siArduino,
  siC,
  siCplusplus,
  siCss,
  siDocker,
  siEspressif,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGooglecloud,
  siHtml5,
  siJavascript,
  siKotlin,
  siLinux,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPython,
  siRaspberrypi,
  siReact,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVite,
} from 'simple-icons'
import { trusted } from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { useRewindPop } from '../useRewindPop'

type BrandIcon = {
  title: string
  hex: string
  path: string
}

type LogoItem = {
  icon: BrandIcon
  label: string
}

const rowA: LogoItem[] = [
  { icon: siReact, label: 'React' },
  { icon: siTypescript, label: 'TypeScript' },
  { icon: siJavascript, label: 'JavaScript' },
  { icon: siPython, label: 'Python' },
  { icon: siC, label: 'C' },
  { icon: siCplusplus, label: 'C++' },
  { icon: siOpenjdk, label: 'Java' },
  { icon: siNodedotjs, label: 'Node.js' },
  { icon: siVite, label: 'Vite' },
  { icon: siTailwindcss, label: 'Tailwind CSS' },
  { icon: siFramer, label: 'Framer Motion' },
  { icon: siHtml5, label: 'HTML5' },
  { icon: siCss, label: 'CSS' },
  { icon: siExpress, label: 'Express' },
  { icon: siKotlin, label: 'Kotlin' },
  { icon: siGit, label: 'Git' },
]

const rowB: LogoItem[] = [
  { icon: siGithub, label: 'GitHub' },
  { icon: siLinux, label: 'Linux' },
  { icon: siArduino, label: 'Arduino' },
  { icon: siEspressif, label: 'ESP32' },
  { icon: siRaspberrypi, label: 'Raspberry Pi' },
  { icon: siFirebase, label: 'Firebase' },
  { icon: siMysql, label: 'MySQL' },
  { icon: siMongodb, label: 'MongoDB' },
  { icon: siFigma, label: 'Figma' },
  { icon: siAndroid, label: 'Android' },
  { icon: siFlutter, label: 'Flutter' },
  { icon: siTensorflow, label: 'TensorFlow' },
  { icon: siDocker, label: 'Docker' },
  { icon: siVercel, label: 'Vercel' },
  { icon: siGooglecloud, label: 'Google Cloud' },
]

function brandHover(hex: string) {
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  // Near-black brands (GitHub, Vercel, Express) disappear on this dark UI
  if (luma < 0.18) return '#e8eef7'
  return `#${hex}`
}

function LogoTile({ item }: { item: LogoItem }) {
  return (
    <span
      className="logo-tile inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-bg-card/90 px-3.5 py-2.5 text-[13px] font-medium text-[hsl(199_42%_72%)] transition duration-300 hover:border-primary/35 hover:bg-primary-soft hover:shadow-[0_0_18px_hsla(199,96%,58%,0.15)]"
      style={{ ['--brand' as string]: brandHover(item.icon.hex) }}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        className="shrink-0 fill-current"
      >
        <path d={item.icon.path} />
      </svg>
      {item.label}
    </span>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 56,
}: {
  items: readonly LogoItem[]
  reverse?: boolean
  duration?: number
}) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-track marquee-fade relative overflow-hidden py-1.5">
      <div
        className={`flex w-max gap-3 ${reverse ? 'marquee-reverse' : 'marquee'}`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <LogoTile key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

function StaticGrid({ items }: { items: readonly LogoItem[] }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 px-5 sm:px-6">
      {items.map((item) => (
        <LogoTile key={item.label} item={item} />
      ))}
    </div>
  )
}

export function Trusted() {
  const reduce = useReducedMotion()
  const all = [...rowA, ...rowB]
  const header = useRewindPop()
  const row = useRewindPop()

  return (
    <section id="trusted" className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="trusted-header"
          style={header.style}
          className="mb-10 max-w-2xl"
        >
          <Eyebrow>{trusted.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {trusted.title}
          </RevealHeading>
          <p className="mt-3 text-[15px] text-muted">{trusted.subtitle}</p>
        </motion.div>
      </div>

      {reduce ? (
        <motion.div
          ref={row.ref}
          style={row.style}
        >
          <StaticGrid items={all} />
        </motion.div>
      ) : (
        <>
      <ul className="sr-only">
        {all.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
        <motion.div
          ref={row.ref}
          style={row.style}
          className="flex flex-col gap-3.5"
          aria-hidden="true"
        >
          <MarqueeRow items={rowA} duration={62} />
          <MarqueeRow items={rowB} reverse duration={70} />
        </motion.div>
        </>
      )}

      <p className="mx-auto mt-8 max-w-2xl px-5 text-center text-[13px] leading-relaxed text-muted sm:px-6">
        {trusted.caption}
      </p>
    </section>
  )
}
