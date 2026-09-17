import { Badge } from '@/components/ui/badge'
import type { ThreatAlert } from './types'

export function ThreatAlertCard({
  alert,
  onAction,
}: {
  alert: ThreatAlert
  onAction?: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-space-sm">
      <div className="flex items-center justify-between gap-2">
        <Badge tone={alert.kind.tone} emphasis="strong">
          {alert.kind.label}
        </Badge>
        <span className="font-mono text-telemetry-code text-outline">{alert.timeAgo}</span>
      </div>
      <p className="text-body-sm font-medium text-on-surface">{alert.body}</p>
      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="font-mono text-telemetry-code text-outline">{alert.footnote}</span>
        <button
          type="button"
          onClick={() => onAction?.(alert.id)}
          className="font-mono text-label-sm font-bold text-secondary uppercase hover:underline"
        >
          {alert.action}
        </button>
      </div>
    </div>
  )
}
