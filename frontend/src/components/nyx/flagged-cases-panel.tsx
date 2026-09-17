import { Badge } from '@/components/ui/badge'
import { FlaggedCaseCard } from './flagged-case-card'
import { PanelHeader } from './panel-header'
import { SectionCard } from './section-card'
import type { FlaggedCase } from './types'

export function FlaggedCasesPanel({
  cases,
  badgeLabel,
  onPrimary,
  onSecondary,
}: {
  cases: FlaggedCase[]
  badgeLabel: string
  onPrimary?: (id: string) => void
  onSecondary?: (id: string) => void
}) {
  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        tone="error"
        round
        pulse
        title="Supervisory Intervention Flagged"
        badge={
          <Badge tone="error" emphasis="strong">
            {badgeLabel}
          </Badge>
        }
        action={<span className="font-mono text-telemetry-code text-outline">PRIORITY SORT</span>}
      />
      <div className="mt-space-sm flex flex-col gap-space-md">
        {cases.map((item) => (
          <FlaggedCaseCard
            key={item.id}
            flaggedCase={item}
            onPrimary={onPrimary}
            onSecondary={onSecondary}
          />
        ))}
      </div>
    </SectionCard>
  )
}
