import { NotebookPen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DspChannelPanel,
  EscalationRequestCard,
  EvidenceAssetRow,
  EvidencePanel,
  IncidentRow,
  IncidentsPanel,
  MetricCard,
  MostWantedPanel,
  NotebookCard,
  NotebooksPanel,
  QuickSearchPanel,
  RecordCategoryCard,
  StationRecordsPanel,
  SystemStatusBar,
  WantedPersonCard,
  WelcomePanel,
} from '@/components/nyx'
import {
  ENTITY_FILTERS,
  ESCALATIONS,
  EVIDENCE_ASSETS,
  INCIDENTS,
  INCIDENT_TABS,
  METRICS,
  NOTEBOOKS,
  RECORD_CATEGORIES,
  STATION,
  SYSTEM_STATUS,
  WANTED_PEOPLE,
} from '@/lib/dashboard-data'
import { Specimen, SpecimenGroup } from './Specimen'

export function InspectorSpecimens() {
  return (
    <SpecimenGroup title="Inspector surface" subtitle="Station-level components">
      <Specimen name="SystemStatusBar">
        <SystemStatusBar {...SYSTEM_STATUS} />
      </Specimen>
      <Specimen name="WelcomePanel" note="eyebrow + unit id + actions">
        <WelcomePanel
          eyebrow="Police HQ dispatch // logged in"
          unitId={STATION.unitId}
          title="Good morning, Inspector."
          description="Operational summary line with supporting copy."
          actions={
            <Button variant="surface" size="lg" className="text-title-sm">
              <NotebookPen className="text-primary" />
              Quick FIR / Incident Log
            </Button>
          }
        />
      </Specimen>
      <Specimen name="MetricCard" note='variant="default"'>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((stat) => (
            <MetricCard key={stat.id} stat={stat} />
          ))}
        </div>
      </Specimen>
      <Specimen name="IncidentRow" note="featured and default action styles">
        <div className="flex flex-col gap-space-xs">
          <IncidentRow incident={INCIDENTS[0]} featured />
          <IncidentRow incident={INCIDENTS[1]} />
        </div>
      </Specimen>
      <Specimen name="IncidentsPanel">
        <IncidentsPanel incidents={INCIDENTS} tabs={INCIDENT_TABS} totalCount={12} />
      </Specimen>
      <Specimen name="NotebookCard" note='variant="card" and "row"'>
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <NotebookCard notebook={NOTEBOOKS[0]} />
          <NotebookCard notebook={NOTEBOOKS[1]} variant="row" />
        </div>
      </Specimen>
      <Specimen name="NotebooksPanel">
        <NotebooksPanel notebooks={NOTEBOOKS} />
      </Specimen>
      <Specimen name="RecordCategoryCard">
        <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-4">
          {RECORD_CATEGORIES.slice(0, 4).map((category) => (
            <RecordCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Specimen>
      <Specimen name="StationRecordsPanel">
        <StationRecordsPanel categories={RECORD_CATEGORIES} totalCount="1,284" updatedToday={32} />
      </Specimen>
      <Specimen name="EscalationRequestCard / DspChannelPanel">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <EscalationRequestCard request={ESCALATIONS[0]} />
          <DspChannelPanel
            channelName="DSP Crime Branch // Operational Link"
            clearance="TIER-1"
            requests={ESCALATIONS}
          />
        </div>
      </Specimen>
      <Specimen name="WantedPersonCard / MostWantedPanel" note="station variant with flag badge">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <WantedPersonCard person={WANTED_PEOPLE[0]} />
          <MostWantedPanel people={WANTED_PEOPLE} activeCount={14} />
        </div>
      </Specimen>
      <Specimen name="EvidenceAssetRow / EvidencePanel">
        <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
          <EvidenceAssetRow asset={EVIDENCE_ASSETS[0]} />
          <EvidencePanel assets={EVIDENCE_ASSETS} />
        </div>
      </Specimen>
      <Specimen name="QuickSearchPanel">
        <QuickSearchPanel entities={ENTITY_FILTERS} />
      </Specimen>
      <Specimen name="Badge" note="tones used across incident and record rows">
        <div className="flex flex-wrap gap-space-sm">
          <Badge tone="error" emphasis="strong">
            High Priority
          </Badge>
          <Badge tone="secondary">Investigating</Badge>
          <Badge tone="tertiary">Forensics Ingest</Badge>
        </div>
      </Specimen>
    </SpecimenGroup>
  )
}
