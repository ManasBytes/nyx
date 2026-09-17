import { Badge } from '@/components/ui/badge'
import { PanelHeader } from './panel-header'
import { SectionCard } from './section-card'
import { StationCommandRow } from './station-command-row'
import type { Station } from './types'

export function StationCommandPanel({
  stations,
  totalLabel,
  recordsScoped,
  recordsDelta,
  collapsedNote,
  onInspect,
  onDossier,
  onExpand,
}: {
  stations: Station[]
  totalLabel: string
  recordsScoped: string
  recordsDelta: string
  collapsedNote?: string
  onInspect?: (id: string) => void
  onDossier?: (id: string) => void
  onExpand?: () => void
}) {
  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        title="Jurisdiction Command // Subordinate Stations"
        badge={<Badge tone="neutral">{totalLabel}</Badge>}
        action={
          <div className="flex items-center gap-space-sm">
            <div className="flex items-center gap-2 rounded bg-surface-container-lowest px-space-xs py-0.5">
              <span className="font-mono text-label-sm text-tertiary">{recordsScoped}</span>
              <span className="font-mono text-telemetry-code text-outline">{recordsDelta}</span>
            </div>
          </div>
        }
      />
      <div className="mt-space-sm flex flex-col gap-space-xs">
        {stations.map((station) => (
          <StationCommandRow
            key={station.id}
            station={station}
            onInspect={onInspect}
            onDossier={onDossier}
          />
        ))}
      </div>
      {collapsedNote ? (
        <div className="mt-space-sm flex items-center justify-between gap-space-sm font-mono text-telemetry-code text-outline">
          <span>{collapsedNote}</span>
          <button type="button" onClick={onExpand} className="text-secondary hover:underline">
            Expand All
          </button>
        </div>
      ) : null}
    </SectionCard>
  )
}
