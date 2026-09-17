import type { ComponentProps, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from 'cn'

export function SectionCard({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn('rounded bg-surface-container-low p-space-md shadow-sm', className)}
      {...props}
    />
  )
}

export function SectionHeader({
  icon: Icon,
  iconClassName = 'text-primary',
  title,
  subtitle,
  badge,
  action,
}: {
  icon: LucideIcon
  iconClassName?: string
  title: string
  subtitle?: string
  badge?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-space-sm flex flex-col gap-space-sm rounded bg-surface-container-lowest/30 p-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Icon className={cn('size-5 shrink-0', iconClassName)} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-headline-md text-on-surface">{title}</h2>
            {badge}
          </div>
          {subtitle ? (
            <span className="font-mono text-label-sm text-outline uppercase">{subtitle}</span>
          ) : null}
        </div>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-space-sm">{action}</div> : null}
    </div>
  )
}
