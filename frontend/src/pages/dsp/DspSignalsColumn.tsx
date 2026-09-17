import { Badge } from '@/components/ui/badge'
import {
  CommissionerUplinkPanel,
  EvidencePanel,
  MostWantedPanel,
  PanelHeader,
  SanctionQueuePanel,
  ThreatAlertsPanel,
} from '@/components/nyx'
import {
  ACTIVE_PETITION,
  DSP_ASSETS,
  SANCTION_REQUESTS,
  THREAT_ALERTS,
  UPLINK_ACTIONS,
  ZONAL_WANTED,
} from '@/lib/dsp-dashboard-data'

export function DspSignalsColumn({
  onEscalate,
  onIntel,
}: {
  onEscalate: () => void
  onIntel: () => void
}) {
  return (
    <div className="flex flex-col gap-space-lg lg:col-span-5 xl:col-span-4">
      <SanctionQueuePanel requests={SANCTION_REQUESTS} pendingCount={12} />
      <CommissionerUplinkPanel
        petition={ACTIVE_PETITION}
        actions={UPLINK_ACTIONS}
        onSelect={(id) => (id === 'intel' ? onIntel() : onEscalate())}
      />
      <ThreatAlertsPanel alerts={THREAT_ALERTS} />
      <EvidencePanel
        assets={DSP_ASSETS}
        header={
          <PanelHeader
            tone="secondary"
            title="Multimodal Ingest Stream"
            action={<span className="font-mono text-telemetry-code text-outline">AI PARSED</span>}
          />
        }
      />
      <MostWantedPanel
        people={ZONAL_WANTED}
        activeCount={ZONAL_WANTED.length}
        showViewAll={false}
        header={
          <PanelHeader
            tone="error"
            round
            title="Zonal Most Wanted"
            action={
              <Badge tone="error" emphasis="strong">
                Zone-A Roster
              </Badge>
            }
          />
        }
      />
    </div>
  )
}
