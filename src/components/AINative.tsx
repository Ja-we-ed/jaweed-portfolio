import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Bot,
  Code2,
  Gamepad2,
  GraduationCap,
  MessageSquareCode,
  Search,
} from 'lucide-react'
import { siClaude, siCursor, siGooglegemini, siHuggingface, siPython } from 'simple-icons'
import { ai } from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { easeOutExpo } from '../motion'
import { useRewindPop } from '../useRewindPop'

type BrandIcon = { title: string; hex: string; path: string }

const TOOL_ICONS: Record<string, BrandIcon> = {
  Cursor: siCursor,
  Claude: siClaude,
  Gemini: siGooglegemini,
  'Hugging Face': siHuggingface,
  Python: siPython,
}

const CARD_ICONS = {
  orchestrate: Bot,
  'assisted-dev': Code2,
  prompts: MessageSquareCode,
  research: Search,
  modding: Gamepad2,
  learning: GraduationCap,
} as const

const GRAPH_NODES = [
  { x: 480, y: 108, r: 7 },
  { x: 160, y: 42, r: 5 },
  { x: 340, y: 28, r: 5 },
  { x: 620, y: 28, r: 5 },
  { x: 800, y: 42, r: 5 },
  { x: 90, y: 128, r: 4.5 },
  { x: 250, y: 188, r: 5 },
  { x: 480, y: 196, r: 5 },
  { x: 710, y: 188, r: 5 },
  { x: 870, y: 128, r: 4.5 },
  { x: 400, y: 78, r: 4 },
  { x: 560, y: 78, r: 4 },
]

const GRAPH_EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 10],
  [0, 11],
  [1, 2],
  [1, 5],
  [2, 10],
  [3, 11],
  [3, 4],
  [4, 9],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [10, 11],
]

function brandFill(hex: string) {
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (luma < 0.18) return '#e8eef7'
  return `#${hex}`
}

function NeuralGraph({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.28'],
  })
  const drawn = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1])
  const nodeOpacity = useTransform(scrollYProgress, [0.2, 0.85], [reduce ? 1 : 0.15, 1])

  return (
    <div ref={ref} className="relative h-[200px] w-full sm:h-[228px]" aria-hidden>
      <svg
        viewBox="0 0 960 220"
        className="h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ai-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {GRAPH_EDGES.map(([a, b], i) => {
          const from = GRAPH_NODES[a]
          const to = GRAPH_NODES[b]
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="hsla(199, 96%, 58%, 0.55)"
              strokeWidth={i === 0 ? 1.6 : 1.15}
              strokeLinecap="round"
              style={{ pathLength: drawn }}
              filter="url(#ai-glow)"
            />
          )
        })}
        {GRAPH_NODES.map((node, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={i === 0 ? 'hsl(199 96% 68%)' : 'hsl(199 96% 58%)'}
            style={{ opacity: nodeOpacity }}
            filter="url(#ai-glow)"
          />
        ))}
      </svg>
    </div>
  )
}

function TerminalPlay({ reduce }: { reduce: boolean }) {
  const { ref, style, progress } = useRewindPop()
  const [shown, setShown] = useState(false)
  const [prompt, setPrompt] = useState(reduce ? ai.terminalPrompt : '')
  const [result, setResult] = useState(reduce ? ai.terminalResult : '')
  const [phase, setPhase] = useState<'idle' | 'prompt' | 'result' | 'done'>(
    reduce ? 'done' : 'idle',
  )

  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= 0.5) setShown(true)
    else if (value <= 0.12) setShown(false)
  })

  useEffect(() => {
    if (!shown) {
      setPrompt(reduce ? '' : '')
      setResult('')
      setPhase('idle')
      return
    }
    if (reduce) {
      setPrompt(ai.terminalPrompt)
      setResult(ai.terminalResult)
      setPhase('done')
      return
    }

    let timer: number
    setPhase('prompt')
    let i = 0
    const typePrompt = () => {
      i += 1
      setPrompt(ai.terminalPrompt.slice(0, i))
      if (i < ai.terminalPrompt.length) {
        timer = window.setTimeout(typePrompt, 16)
      } else {
        setPhase('result')
        window.setTimeout(() => {
          setResult(ai.terminalResult)
          setPhase('done')
        }, 280)
      }
    }
    timer = window.setTimeout(typePrompt, 180)
    return () => window.clearTimeout(timer)
  }, [shown, reduce])

  return (
    <motion.div
      ref={ref}
      data-pop="ai-terminal"
      style={style}
      className="min-h-[12rem] overflow-hidden rounded-2xl border border-primary/20 bg-[rgba(8,20,28,0.55)] px-4 py-4 font-mono text-[13px] leading-relaxed backdrop-blur-[8px] sm:px-5 lg:min-h-[8rem]"
    >
      <p className="text-[12px] sm:text-[11px] uppercase tracking-[0.18em] text-primary/80">Directed session</p>
      <p className="mt-2 text-text">
        <span className="text-primary">›</span> {prompt}
        {phase === 'prompt' && (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-px bg-primary align-middle" />
        )}
      </p>
      {(phase === 'result' || phase === 'done') && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="mt-2 text-muted"
        >
          <span className="text-primary">→</span> {result}
        </motion.p>
      )}
    </motion.div>
  )
}

function AiCard({
  card,
  index,
}: {
  card: (typeof ai.cards)[number]
  index: number
}) {
  const pop = useRewindPop(index * 0.06)
  const Icon = CARD_ICONS[card.id]
  return (
    <motion.article
      ref={pop.ref}
      data-pop={`ai-card-${card.id}`}
      style={pop.style}
      className="rounded-2xl border border-primary/20 bg-[rgba(8,20,28,0.4)] p-5 backdrop-blur-[7px]"
    >
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary-soft text-primary">
        <Icon size={20} aria-hidden />
      </span>
      <h3 className="font-display text-lg font-semibold tracking-tight text-text">{card.title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{card.proof}</p>
    </motion.article>
  )
}

export function AINative() {
  const reduce = useReducedMotion()
  const header = useRewindPop()

  return (
    <section id="ai" className="relative scroll-mt-28 overflow-hidden border-t border-border/60 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="ai-header"
          style={header.style}
          className="mb-8 max-w-2xl"
        >
          <Eyebrow>{ai.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {ai.title}
          </RevealHeading>
          <p className="mt-3 text-[15px] text-muted">{ai.subtitle}</p>
        </motion.div>

        <div className="grid items-center gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <TerminalPlay reduce={!!reduce} />
          <NeuralGraph reduce={!!reduce} />
        </div>

        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ai.cards.map((card, index) => (
            <AiCard key={card.id} card={card} index={index} />
          ))}
        </div>

        <div className="mt-12">
          <p className="font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.2em] text-primary">{ai.toolkitLabel}</p>
          <p className="mt-1 text-[13px] text-muted">{ai.toolkitNote}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {ai.toolkit.map((tool) => {
              const icon = tool.icon ? TOOL_ICONS[tool.icon] : undefined
              return (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/80 px-3.5 py-2 text-[13px] font-medium text-text"
                >
                  {icon ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="shrink-0">
                      <path d={icon.path} fill={brandFill(icon.hex)} />
                    </svg>
                  ) : (
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-[#10a37f] font-mono text-[12px] sm:text-[9px] font-bold leading-none text-white" aria-hidden>
                      G
                    </span>
                  )}
                  {tool.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
