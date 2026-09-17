import type { ReactNode } from 'react'
import { cn } from 'cn'

export function SpecimenGroup({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-0.5 rounded bg-surface-container-lowest p-space-md">
        <h2 className="font-heading text-headline-md text-on-surface">{title}</h2>
        <span className="font-mono text-label-sm text-outline uppercase">{subtitle}</span>
      </div>
      <div className="flex flex-col gap-space-lg">{children}</div>
    </section>
  )
}

export function Specimen({
  name,
  note,
  className,
  children,
}: {
  name: string
  note?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex flex-wrap items-baseline gap-2 border-b border-surface-variant pb-1">
        <code className="font-mono text-label-lg text-primary">{`<${name} />`}</code>
        {note ? <span className="font-mono text-label-sm text-outline">{note}</span> : null}
      </div>
      <div className={cn('rounded bg-surface-container-lowest/40 p-space-md', className)}>
        {children}
      </div>
    </div>
  )
}
