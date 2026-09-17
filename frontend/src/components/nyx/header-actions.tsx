import { type LucideIcon } from 'lucide-react'
import { cn } from 'cn'
import { MessagesSquare } from 'lucide-react'
import { PulseDot } from './pulse-dot'
import type { Tone } from './types'

export type HeaderCounter = {
  id: string
  icon: LucideIcon
  label: string
  count?: number
  tone?: Tone
}

const counterClass: Partial<Record<Tone, string>> = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
  error: 'bg-error-container text-error',
}

export function HeaderActions({
  commsLabel = 'COMMS',
  commsCount,
  counters = [],
}: {
  commsLabel?: string
  commsCount?: number
  counters?: HeaderCounter[]
}) {
  return (
    <div className="flex items-center gap-space-xs">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded bg-surface-container-low px-2.5 py-1.5 text-tertiary transition-colors hover:bg-surface-container"
      >
        <MessagesSquare className="size-4" />
        <span className="font-mono text-label-sm uppercase">
          {commsLabel}
          {commsCount === undefined ? '' : ` (${commsCount})`}
        </span>
        <PulseDot tone="tertiary" className="size-1.5" />
      </button>
      {counters.map(({ id, icon: Icon, count, tone = 'secondary', label }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          className="relative rounded bg-surface-container-low p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
        >
          <Icon className="size-5" />
          {count === undefined ? (
            <span className={cn('absolute top-1 right-1 size-2 rounded-full', counterClass[tone])} />
          ) : (
            <span
              className={cn(
                'absolute -top-1 -right-1 rounded px-1 font-mono text-[9px] leading-tight font-bold',
                counterClass[tone]
              )}
            >
              {count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
