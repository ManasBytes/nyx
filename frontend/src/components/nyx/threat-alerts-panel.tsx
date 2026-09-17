import { PanelHeader } from './panel-header'
import { SectionCard } from './section-card'
import { ThreatAlertCard } from './threat-alert-card'
import type { ThreatAlert } from './types'

export function ThreatAlertsPanel({
  alerts,
  onAction,
}: {
  alerts: ThreatAlert[]
  onAction?: (id: string) => void
}) {
  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        tone="error"
        round
        title="Live Zonal Threat Signals"
        action={
          <span className="font-mono text-telemetry-code font-semibold text-error">
            {alerts.length} ACTIVE
          </span>
        }
      />
      <div className="mt-space-sm flex flex-col gap-space-sm">
        {alerts.map((alert) => (
          <ThreatAlertCard key={alert.id} alert={alert} onAction={onAction} />
        ))}
      </div>
    </SectionCard>
  )
}
