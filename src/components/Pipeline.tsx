import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { pipeline } from '../content'
import { Eyebrow } from './Eyebrow'
import { RevealHeading } from './RevealHeading'
import { easeOutExpo } from '../motion'
import { useRewindPop } from '../useRewindPop'

type Node = (typeof pipeline.nodes)[number]

function CircuitCard({
  node,
  index,
  active,
  flip,
}: {
  node: Node
  index: number
  active: boolean
  flip: boolean
}) {
  const card = useRewindPop(index * 0.04)
  return (
    <motion.article
      ref={card.ref}
      id={`circuit-${node.id}`}
      data-circuit-card={index}
      data-pop={`pipeline-card-${index}`}
      style={card.style}
      className={`group grid overflow-hidden rounded-2xl border bg-bg-card/80 shadow-[0_0_0_1px_hsla(199,96%,58%,0)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 md:grid-cols-2 ${
        active
          ? 'border-primary/55 shadow-[0_20px_60px_hsla(199,96%,58%,0.16)]'
          : 'border-border'
      }`}
    >
      <div className={`relative h-48 overflow-hidden bg-bg-elevated sm:h-56 md:h-auto md:min-h-[240px] ${flip ? 'md:order-2' : ''}`}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={node.image}
              alt={node.imageAlt}
              width={900}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover brightness-[1.05] contrast-[1.04] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              draggable={false}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-card/50 via-transparent to-bg/10 md:bg-gradient-to-r md:from-transparent md:to-bg-card/20" />
        <span
          className={`absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-[12px] font-semibold backdrop-blur ${
            active
              ? 'border-primary/60 bg-primary text-bg shadow-[0_0_24px_hsla(199,96%,58%,0.45)]'
              : 'border-primary/35 bg-bg/70 text-primary'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-col justify-center p-5 sm:p-7">
        <p className="font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.18em] text-primary">{node.detail}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text sm:text-[1.75rem]">
          {node.label}
        </h3>
        <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">{node.body}</p>
      </div>
    </motion.article>
  )
}

export function Pipeline() {
  const reduce = useReducedMotion()
  const nodes = pipeline.nodes
  const [active, setActive] = useState(0)
  const pillsRef = useRef<HTMLDivElement>(null)
  const header = useRewindPop()
  const outcome = useRewindPop()

  useEffect(() => {
    const ids = nodes.map((node) => `circuit-${node.id}`)
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.45
      let next = 0
      for (let i = 0; i < ids.length; i += 1) {
        const el = document.getElementById(ids[i])
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) next = i
      }
      setActive((prev) => (prev === next ? prev : next))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [nodes])

  useEffect(() => {
    const current = pillsRef.current?.querySelector<HTMLElement>('[aria-current="step"]')
    current?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [active, reduce])

  const jump = (index: number) => {
    setActive(index)
    document.getElementById(`circuit-${nodes[index].id}`)?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  return (
    <section
      id="pipeline"
      data-circuit-active={active + 1}
      className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={header.ref}
          data-pop="pipeline-header"
          style={header.style}
          className="mb-10 max-w-2xl"
        >
          <Eyebrow>{pipeline.eyebrow}</Eyebrow>
          <RevealHeading className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {pipeline.title}
          </RevealHeading>
          <p className="mt-3 text-[15px] text-muted">{pipeline.subtitle}</p>
        </motion.div>

        <div className="sticky top-20 z-20 -mx-5 mb-6 border-y border-border/60 bg-bg/80 px-5 py-3 backdrop-blur-md lg:hidden">
          <div ref={pillsRef} className="flex gap-2 overflow-x-auto hide-scrollbar" aria-label="Circuit steps">
            {nodes.map((node, i) => {
              const isActive = active === i
              const isDone = i < active
              return (
              <button
                key={node.id}
                type="button"
                onClick={() => jump(i)}
                aria-current={isActive ? 'step' : undefined}
                className={`relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition ${
                  isActive
                    ? 'font-semibold text-[#22d3ee]'
                    : isDone
                      ? 'border border-[#22d3ee]/30 font-medium text-[#5ec8db] hover:border-[#22d3ee]/50 hover:text-[#22d3ee]'
                      : 'border border-border font-medium text-muted hover:border-primary/35 hover:text-text'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={reduce ? undefined : 'circuit-mobile-pill'}
                    className="absolute inset-0 -z-10 rounded-full bg-[hsla(187,94%,53%,0.16)] shadow-[0_0_18px_hsla(187,94%,53%,0.32)] ring-1 ring-[#22d3ee]/70"
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                )}
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive
                      ? 'bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]'
                      : isDone
                        ? 'bg-[#5ec8db]'
                        : 'border border-current bg-transparent'
                  }`}
                  aria-hidden
                />
                {String(i + 1).padStart(2, '0')} {node.label}
              </button>
              )
            })}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:items-start lg:gap-10">
          <nav
            aria-label="Circuit progress"
            className="sticky top-28 hidden self-start lg:block"
          >
            <ol className="relative space-y-1.5">
              {nodes.map((node, i) => {
                const isActive = active === i
                const isDone = i < active
                return (
                <li key={node.id}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      isActive
                        ? 'text-[#22d3ee]'
                        : isDone
                          ? 'text-[#5ec8db] hover:bg-[hsla(187,94%,53%,0.06)] hover:text-[#22d3ee]'
                          : 'text-muted hover:bg-white/[0.03] hover:text-text'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={reduce ? undefined : 'circuit-rail-pill'}
                        className="absolute inset-0 -z-10 rounded-xl bg-[hsla(187,94%,53%,0.16)] shadow-[0_0_24px_hsla(187,94%,53%,0.3)] ring-1 ring-[#22d3ee]/70"
                        transition={{ duration: 0.38, ease: easeOutExpo }}
                      />
                    )}
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                        isActive
                          ? 'bg-[#22d3ee] shadow-[0_0_12px_#22d3ee] ring-2 ring-[#22d3ee]/35'
                          : isDone
                            ? 'bg-[#5ec8db]'
                            : 'border border-current bg-transparent'
                      }`}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.16em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`mt-0.5 block font-display tracking-tight ${
                          isActive ? 'text-[1.2rem] font-bold text-[#22d3ee]' : 'text-base font-semibold'
                        }`}
                      >
                        {node.label}
                      </span>
                    </span>
                  </button>
                </li>
                )
              })}
            </ol>
            <p className="mt-5 pl-4 font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.18em] text-primary">
              → {pipeline.outcome}
            </p>
          </nav>

          <div className="relative space-y-5">
            <div
              className="pointer-events-none absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-primary via-primary/35 to-transparent md:block lg:hidden"
              aria-hidden
            />
            {!reduce && (
              <span
                className="circuit-pulse pointer-events-none absolute left-[1.15rem] top-10 hidden h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(199_96%_58%)] md:block lg:hidden"
                aria-hidden
              />
            )}

            {nodes.map((node, i) => (
              <CircuitCard
                key={node.id}
                node={node}
                index={i}
                active={active === i}
                flip={i % 2 === 1}
              />
            ))}

            <motion.div
              ref={outcome.ref}
              style={outcome.style}
              className="flex justify-center pt-2 lg:hidden"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-2 font-mono text-[12px] sm:text-[11px] uppercase tracking-[0.2em] text-primary shadow-[0_0_24px_hsla(199,96%,58%,0.2)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                → {pipeline.outcome}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
