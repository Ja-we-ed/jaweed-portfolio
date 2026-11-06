import type { ReactNode } from 'react'

export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-primary ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/55 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      {children}
    </p>
  )
}
