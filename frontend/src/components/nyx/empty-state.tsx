import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

export function EmptyState({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  eyebrow?: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-space-md rounded-xl bg-surface-container-low p-space-xl text-center shadow-md">
      <span className="flex size-12 items-center justify-center rounded-lg bg-surface-container">
        <Icon className="size-6 text-primary" />
      </span>
      <div className="flex max-w-md flex-col items-center gap-space-xs">
        {eyebrow ? (
          <Badge tone="outline" emphasis="strong">
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className="font-heading text-headline-md text-on-surface">{title}</h2>
        <p className="text-body-md text-on-surface-variant">{description}</p>
      </div>
      {action}
    </div>
  )
}
