import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  ActionListButton,
  CommissionerUplinkPanel,
  DirectCaseCard,
  DirectCasesPanel,
  EscalateBriefDialog,
  FlaggedCaseCard,
  FlaggedCasesPanel,
  IntelRequisitionDialog,
  MetricCard,
  MostWantedPanel,
  NotebooksPanel,
  PanelHeader,
  SanctionQueuePanel,
  SanctionRequestCard,
  StationCommandPanel,
  StationCommandRow,
  ThreatAlertCard,
  ThreatAlertsPanel,
  UploadDropzone,
  UploadQueueRow,
  DataScopeBar,
  WantedPersonCard,
} from '@/components/nyx'
import {
  ACTIVE_PETITION,
  DIRECT_CASES,
  DSP_METRICS,
  DSP_NOTEBOOKS,
  ESCALATION_DRAFT,
  FLAGGED_CASES,
  INTEL_AGENCIES,
  SANCTION_REQUESTS,
  STATIONS,
  THREAT_ALERTS,
  UPLINK_ACTIONS,
  ZONAL_WANTED,
} from '@/lib/dsp-dashboard-data'
import { Specimen, SpecimenGroup } from './Specimen'

export function DspSpecimens() {
  const [escalateOpen, setEscalateOpen] = useState(false)
  const [intelOpen, setIntelOpen] = useState(false)

  return (
    <SpecimenGroup title="DSP surface" subtitle="Zonal command components">
      <Specimen name="MetricCard" note='variant="compact"'>
        <div className="grid grid-cols-2 gap-space-sm md:grid-cols-3 lg:grid-cols-6">
          {DSP_METRICS.map((stat) => (
            <MetricCard key={stat.id} stat={stat} variant="compact" />
          ))}
        </div>
      </Specimen>
      <Specimen name="StationCommandRow">
        <StationCommandRow station={STATIONS[0]} />
      </Specimen>
      <Specimen name="StationCommandPanel">
        <StationCommandPanel
          stations={STATIONS}
          totalLabel="8 STATIONS"
          recordsScoped="9,842 RECORDS SCOPED"
          recordsDelta="+148 Today"
          collapsedNote="+ Flower Bazaar, Royapuram, Kilpauk, Chintadripet (All synchronized)"
        />
      </Specimen>
      <Specimen name="FlaggedCaseCard">
        <FlaggedCaseCard flaggedCase={FLAGGED_CASES[0]} />
      </Specimen>
      <Specimen name="FlaggedCasesPanel">
        <FlaggedCasesPanel cases={FLAGGED_CASES} badgeLabel="7 cases require DSP action" />
      </Specimen>
      <Specimen name="DirectCaseCard / DirectCasesPanel">
        <div className="flex flex-col gap-space-md">
          <DirectCaseCard directCase={DIRECT_CASES[0]} />
          <DirectCasesPanel cases={DIRECT_CASES} />
        </div>
      </Specimen>
      <Specimen name="SanctionRequestCard / SanctionQueuePanel">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <SanctionRequestCard request={SANCTION_REQUESTS[0]} />
          <SanctionQueuePanel requests={SANCTION_REQUESTS} pendingCount={12} />
        </div>
      </Specimen>
      <Specimen name="ActionListButton / CommissionerUplinkPanel">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <ActionListButton action={UPLINK_ACTIONS[0]} />
          <CommissionerUplinkPanel petition={ACTIVE_PETITION} actions={UPLINK_ACTIONS} />
        </div>
      </Specimen>
      <Specimen name="ThreatAlertCard / ThreatAlertsPanel">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <ThreatAlertCard alert={THREAT_ALERTS[0]} />
          <ThreatAlertsPanel alerts={THREAT_ALERTS} />
        </div>
      </Specimen>
      <Specimen name="NotebooksPanel" note='variant="row" with a PanelHeader slot'>
        <NotebooksPanel
          notebooks={DSP_NOTEBOOKS}
          variant="row"
          columns="md:grid-cols-2"
          header={<PanelHeader tone="secondary" title="Supervisory Dossier Notebooks" />}
        />
      </Specimen>
      <Specimen name="WantedPersonCard / MostWantedPanel" note="zonal variant with tier and reward">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <WantedPersonCard person={ZONAL_WANTED[0]} />
          <MostWantedPanel
            people={ZONAL_WANTED}
            activeCount={ZONAL_WANTED.length}
            showViewAll={false}
            header={<PanelHeader tone="error" round title="Zonal Most Wanted" />}
          />
        </div>
      </Specimen>
      <Specimen name="DataScopeBar" note="zone scope with station delegation">
        <DataScopeBar
          scopeKind="Zone scope"
          scopeLabel="DSP Zone — Chennai Central"
          stations={STATIONS.map((station) => station.name)}
          station={STATIONS[0].name}
          delegate={STATIONS[0].sho}
        />
      </Specimen>
      <Specimen name="UploadDropzone / UploadQueueRow" note="staging files locally">
        <div className="flex flex-col gap-space-md">
          <UploadDropzone hint="CCTV, CDR sheets, seizure photos, forensic PDFs" onFiles={() => {}} />
          <UploadQueueRow
            upload={{ id: 'demo', name: 'CCTV_Harbor_Gate4_Night.mp4', size: 48_234_496, status: 'Staged' }}
          />
        </div>
      </Specimen>
      <Specimen name="EscalateBriefDialog / IntelRequisitionDialog" note="Radix dialog — click to open">
        <div className="flex flex-wrap gap-space-sm">
          <Button variant="primary-container" onClick={() => setEscalateOpen(true)}>
            Open escalation dialog
          </Button>
          <Button variant="secondary-container" onClick={() => setIntelOpen(true)}>
            Open intel requisition dialog
          </Button>
        </div>
        <EscalateBriefDialog
          open={escalateOpen}
          onOpenChange={setEscalateOpen}
          {...ESCALATION_DRAFT}
          onTransmit={() => setEscalateOpen(false)}
        />
        <IntelRequisitionDialog
          open={intelOpen}
          onOpenChange={setIntelOpen}
          agencies={INTEL_AGENCIES}
          onDispatch={() => setIntelOpen(false)}
        />
      </Specimen>
    </SpecimenGroup>
  )
}
