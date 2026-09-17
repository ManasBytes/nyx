import type { ReactNode } from 'react'
import { cn } from 'cn'
import type { Tone } from './types'

const dotClass: Record<Tone, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
  neutral: 'bg-on-surface-variant',
  outline: 'bg-outline',
}

export function PanelHeader({
  tone = 'primary',
  title,
  badge,
  action,
  round = false,
  pulse = false,
}: {
  tone?: Tone
  title: string
  badge?: ReactNode
  action?: ReactNode
  round?: boolean
  pulse?: boolean
}) {
  return (
    <div className="flex flex-col justify-between gap-space-xs pb-space-sm sm:flex-row sm:items-center">
      <div className="flex items-center gap-space-sm">
        <span
          className={cn(
            'size-2.5 shrink-0',
            round ? 'rounded-full' : 'rounded-xs',
            pulse && 'animate-pulse',
            dotClass[tone]
          )}
        />
        <span className="text-title-sm font-bold tracking-wider text-on-surface uppercase">{title}</span>
        {badge}
      </div>
      {action ? <div className="flex items-center gap-space-sm">{action}</div> : null}
    </div>
  )
}
