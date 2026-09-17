import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import type { FlaggedCase } from './types'

export function FlaggedCaseCard({
  flaggedCase,
  onPrimary,
  onSecondary,
}: {
  flaggedCase: FlaggedCase
  onPrimary?: (id: string) => void
  onSecondary?: (id: string) => void
}) {
  return (
    <div className="rounded-lg bg-surface-container p-space-md">
      <div className="mb-space-xs flex flex-col justify-between gap-space-xs sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-space-xs">
          <span className="rounded bg-surface-container-lowest px-1.5 py-0.5 font-mono text-telemetry-code font-bold text-primary">
            {flaggedCase.code}
          </span>
          <span className="text-title-sm text-on-surface">{flaggedCase.title}</span>
        </div>
        <span className="font-mono text-label-sm text-outline">{flaggedCase.origin}</span>
      </div>
      <p className="mb-space-sm text-body-sm text-on-surface-variant">
        <strong className="font-medium text-error">Trigger:</strong> {flaggedCase.trigger}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
        <div className="flex flex-wrap items-center gap-space-md font-mono text-telemetry-code">
          {flaggedCase.meta.map((item) => (
            <span key={item.label} className="flex items-center gap-1 text-on-surface">
              <item.icon className={cn('size-3.5', item.iconClassName ?? 'text-tertiary')} />
              {item.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-space-xs">
          <Button variant="surface" size="xs" className="uppercase" onClick={() => onSecondary?.(flaggedCase.id)}>
            {flaggedCase.secondaryAction}
          </Button>
          <Button
            variant={flaggedCase.primaryTone === 'error' ? 'destructive' : 'primary-container'}
            size="xs"
            className="uppercase"
            onClick={() => onPrimary?.(flaggedCase.id)}
          >
            {flaggedCase.primaryAction}
          </Button>
        </div>
      </div>
    </div>
  )
}
