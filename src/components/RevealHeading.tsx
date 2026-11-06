import type { ReactNode } from 'react'

export function RevealHeading({
  as: Tag = 'h2',
  children,
  className = '',
}: {
  as?: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
}) {
  return <Tag className={className}>{children}</Tag>
}
