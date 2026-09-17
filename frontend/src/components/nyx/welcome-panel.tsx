import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function WelcomePanel({
  icon: Icon,
  eyebrow,
  unitId,
  title,
  titleBadges,
  description,
  actions,
}: {
  icon?: LucideIcon
  eyebrow?: string
  unitId?: string
  title: string
  titleBadges?: ReactNode
  description: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col justify-between gap-space-md rounded bg-surface-container-low p-space-lg shadow-sm lg:flex-row lg:items-center">
      <div className="flex items-start gap-space-md">
        {Icon ? (
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-container/20">
            <Icon className="size-6 text-primary-container" />
          </div>
        ) : null}
        <div className="flex flex-col">
          {eyebrow || unitId ? (
            <div className="mb-1 flex items-center gap-2">
              {eyebrow ? (
                <span className="font-mono text-label-sm tracking-wider text-outline uppercase">
                  {eyebrow}
                </span>
              ) : null}
              {unitId ? (
                <Badge tone="neutral" className="text-on-surface">
                  UNIT ID: {unitId}
                </Badge>
              ) : null}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-heading text-headline-lg tracking-tight text-on-surface">{title}</h1>
            {titleBadges}
          </div>
          <p className="mt-0.5 text-body-md text-on-surface-variant">{description}</p>
        </div>
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-space-sm">{actions}</div>
      ) : null}
    </div>
  )
}
