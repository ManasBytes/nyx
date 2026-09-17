import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SanctionRequest } from './types'

export function SanctionRequestCard({
  request,
  onSanction,
  onReview,
  onReject,
}: {
  request: SanctionRequest
  onSanction?: (id: string) => void
  onReview?: (id: string) => void
  onReject?: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-space-xs rounded-lg bg-surface-container p-space-sm">
      <div className="flex items-center justify-between gap-2 font-mono text-telemetry-code">
        <span className="font-bold text-primary">{request.code}</span>
        <Badge tone={request.kind.tone}>{request.kind.label}</Badge>
      </div>
      <div className="text-body-sm font-semibold text-on-surface">
        {request.officer} <span className="font-normal text-outline">({request.station})</span>
      </div>
      <div className="font-mono text-telemetry-code text-on-surface-variant">{request.detail}</div>
      <div className="mt-space-xs flex items-center gap-space-xs pt-space-xs">
        <Button
          variant="primary-container"
          size="xs"
          className="flex-1 font-bold uppercase"
          onClick={() => onSanction?.(request.id)}
        >
          {request.primaryAction}
        </Button>
        <Button variant="surface" size="xs" className="uppercase" onClick={() => onReview?.(request.id)}>
          {request.secondaryAction}
        </Button>
        {request.rejectAction ? (
          <Button
            variant="destructive"
            size="xs"
            className="uppercase"
            onClick={() => onReject?.(request.id)}
          >
            {request.rejectAction}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
