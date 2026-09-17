import { Badge } from '@/components/ui/badge'
import { PanelHeader } from './panel-header'
import { SanctionRequestCard } from './sanction-request-card'
import { SectionCard } from './section-card'
import type { SanctionRequest } from './types'

export function SanctionQueuePanel({
  requests,
  pendingCount,
  onSanction,
  onReview,
  onReject,
  onViewAll,
}: {
  requests: SanctionRequest[]
  pendingCount: number
  onSanction?: (id: string) => void
  onReview?: (id: string) => void
  onReject?: (id: string) => void
  onViewAll?: () => void
}) {
  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        title="Inspector Sanction Queue"
        action={
          <Badge tone="solid" emphasis="strong">
            {pendingCount} Pending
          </Badge>
        }
      />
      <div className="mt-space-sm flex flex-col gap-space-sm">
        {requests.map((request) => (
          <SanctionRequestCard
            key={request.id}
            request={request}
            onSanction={onSanction}
            onReview={onReview}
            onReject={onReject}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="mt-space-sm w-full pt-space-xs text-center font-mono text-label-sm font-semibold tracking-wider text-secondary uppercase transition-colors hover:text-on-surface"
      >
        View All {pendingCount} Inspector Requests →
      </button>
    </SectionCard>
  )
}
