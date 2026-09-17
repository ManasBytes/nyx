import { ActionListButton } from './action-list-button'
import { PanelHeader } from './panel-header'
import { PulseDot } from './pulse-dot'
import { SectionCard } from './section-card'
import type { UplinkAction } from './types'

export function CommissionerUplinkPanel({
  petition,
  actions,
  onSelect,
}: {
  petition: { code: string; status: string; summary: string }
  actions: UplinkAction[]
  onSelect?: (id: string) => void
}) {
  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        title="Commissioner Uplink & External"
        action={
          <span className="flex items-center gap-1 font-mono text-telemetry-code text-tertiary">
            <PulseDot tone="tertiary" className="size-1.5" />
            CP ENCRYPTED LIVE
          </span>
        }
      />
      <div className="mb-space-sm rounded-lg bg-surface-container p-space-sm">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="font-mono text-label-sm font-semibold text-secondary">
            ACTIVE PETITION: {petition.code}
          </span>
          <span className="font-mono text-telemetry-code text-primary">{petition.status}</span>
        </div>
        <p className="text-body-sm text-on-surface-variant">{petition.summary}</p>
      </div>
      <div className="flex flex-col gap-space-xs">
        {actions.map((action) => (
          <ActionListButton key={action.id} action={action} onSelect={onSelect} />
        ))}
      </div>
    </SectionCard>
  )
}
