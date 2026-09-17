import { ArrowRight } from 'lucide-react'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import type { MetricStat } from './types'

export function MetricCard({
  stat,
  variant = 'default',
  onClick,
}: {
  stat: MetricStat
  variant?: 'default' | 'compact'
  onClick?: (id: string) => void
}) {
  const { icon: Icon, iconClassName = 'text-primary' } = stat

  if (variant === 'compact') return <CompactMetricCard stat={stat} onClick={onClick} />

  return (
    <button
      type="button"
      onClick={() => onClick?.(stat.id)}
      className="group relative flex flex-col justify-between overflow-hidden rounded bg-surface-container-low p-space-md text-left shadow-sm transition-all hover:bg-surface-container"
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-mono text-label-md tracking-wider text-outline uppercase">
          {stat.label}
        </span>
        <Icon className={cn('size-5', iconClassName)} />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-heading text-headline-lg font-bold text-on-surface">{stat.value}</span>
        <Badge tone={stat.highlight.tone}>{stat.highlight.label}</Badge>
      </div>
      <div className="-mx-space-md -mb-space-md mt-3 flex w-[calc(100%+var(--spacing-space-md)*2)] items-center justify-between bg-surface-container-lowest/40 px-space-md py-1.5">
        <span className="font-mono text-telemetry-code text-on-surface-variant">{stat.footnote}</span>
        <ArrowRight className="size-3.5 text-outline" />
      </div>
    </button>
  )
}

function CompactMetricCard({
  stat,
  onClick,
}: {
  stat: MetricStat
  onClick?: (id: string) => void
}) {
  const { icon: Icon, iconClassName = 'text-secondary' } = stat

  return (
    <button
      type="button"
      onClick={() => onClick?.(stat.id)}
      className="flex flex-col justify-between rounded-lg bg-surface-container-low p-space-md text-left shadow-sm transition-colors hover:bg-surface-container"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="font-mono text-label-sm tracking-wider text-outline uppercase">
          {stat.label}
        </span>
        <Icon className={cn('size-4 shrink-0', iconClassName)} />
      </div>
      <div className="my-space-xs flex items-baseline gap-space-xs">
        <span className={cn('font-heading text-headline-xl font-bold', stat.valueClassName ?? 'text-on-surface')}>
          {stat.value}
        </span>
        <span className={cn('font-mono text-telemetry-code', highlightClass[stat.highlight.tone ?? 'tertiary'])}>
          {stat.highlight.label}
        </span>
      </div>
      <span className="truncate font-mono text-label-sm text-on-surface-variant">{stat.footnote}</span>
    </button>
  )
}

const highlightClass: Record<string, string> = {
  primary: 'text-primary-container font-semibold',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  error: 'text-error',
  neutral: 'text-on-surface-variant',
  outline: 'text-outline',
}
