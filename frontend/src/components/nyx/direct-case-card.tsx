import { Badge } from '@/components/ui/badge'
import type { DirectCase } from './types'

export function DirectCaseCard({
  directCase,
  onOpen,
}: {
  directCase: DirectCase
  onOpen?: (id: string) => void
}) {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-surface-container p-space-md transition-colors hover:bg-surface-container-high">
      <div>
        <div className="mb-space-xs flex items-center justify-between gap-2">
          <span className="font-mono text-telemetry-code font-bold text-primary">{directCase.code}</span>
          <Badge tone="tertiary" className="bg-surface-container-lowest">
            {directCase.classification}
          </Badge>
        </div>
        <h4 className="text-title-sm text-on-surface">{directCase.title}</h4>
        <p className="mt-1 text-body-sm text-on-surface-variant">{directCase.summary}</p>
      </div>
      <div className="mt-space-md flex items-center justify-between gap-2 pt-space-xs">
        <div className="flex items-center gap-2 font-mono text-telemetry-code text-outline">
          {directCase.stats.map((stat, index) => (
            <span key={stat} className="flex items-center gap-2">
              {index > 0 ? <span>•</span> : null}
              {stat}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onOpen?.(directCase.id)}
          className="font-mono text-label-sm font-semibold text-secondary uppercase hover:underline"
        >
          {directCase.action} →
        </button>
      </div>
    </div>
  )
}
