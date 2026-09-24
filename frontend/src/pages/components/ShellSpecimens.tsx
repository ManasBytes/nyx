import { useState } from 'react'
import { Bell, Building2, FileCheck, FolderOpen, Radar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  EmptyState,
  EntityChip,
  ModuleCard,
  FilterTabs,
  HeaderActions,
  PanelHeader,
  PulseDot,
  SearchField,
  SectionCard,
  SectionHeader,
  SidebarNavItem,
  SidebarProfile,
  SidebarStatus,
  UserChip,
} from '@/components/nyx'
import { DSP } from '@/lib/dsp-dashboard-data'
import { ENTITY_FILTERS, INCIDENT_TABS, STATION } from '@/lib/dashboard-data'
import { LEVELS } from '@/lib/levels'
import { Specimen, SpecimenGroup } from './Specimen'

const TONES = ['primary', 'secondary', 'tertiary', 'error', 'neutral', 'outline'] as const

export function ShellSpecimens() {
  const [tab, setTab] = useState(INCIDENT_TABS[0].id)

  return (
    <SpecimenGroup title="Shell & primitives" subtitle="Navigation chrome and building blocks">
      <Specimen name="AppShell / AppSidebar / AppHeader" note="rendered live around this page">
        <p className="text-body-sm text-on-surface-variant">
          The sidebar, topbar, search field and user chip framing this page are those components.
          Compare the DSP configuration (grouped nav, clearance chip, profile footer) at{' '}
          <code className="font-mono text-primary">/dsp/records</code>.
        </p>
      </Specimen>
      <Specimen name="SidebarNavItem" note="linked, unbuilt (greyed) and collapsed states">
        <div className="flex gap-space-md">
          <div className="w-72 rounded bg-surface-container-lowest p-space-sm">
            {LEVELS[4].nav[1].items.map((item) => (
              <SidebarNavItem key={item.id} item={item} />
            ))}
          </div>
          <div className="w-14 rounded bg-surface-container-lowest p-space-xs">
            {LEVELS[4].nav[1].items.map((item) => (
              <SidebarNavItem key={item.id} item={item} collapsed />
            ))}
          </div>
        </div>
      </Specimen>
      <Specimen name="SidebarStatus / SidebarProfile" note="sidebar footers">
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="w-full rounded bg-surface-container-lowest">
            <SidebarStatus label="SEC-NET: SECURE" version="v4.9.2" />
          </div>
          <div className="w-full rounded bg-surface-container-lowest">
            <SidebarProfile
              name={DSP.officer.name}
              role={DSP.officer.role}
              meta={DSP.stationsSynced}
              metaIcon={Building2}
            />
          </div>
        </div>
      </Specimen>
      <Specimen name="HeaderActions / UserChip" note="topbar right cluster">
        <div className="flex flex-wrap items-center gap-space-lg">
          <HeaderActions
            commsCount={3}
            counters={[
              { id: 'requests', icon: FileCheck, count: 12, tone: 'secondary', label: 'Requests' },
              { id: 'alerts', icon: Bell, tone: 'primary', label: 'Alerts' },
            ]}
          />
          <UserChip user={STATION.officer} onSignOut={() => {}} />
        </div>
      </Specimen>
      <Specimen name="EmptyState" note="module placeholder and 404 body">
        <EmptyState
          icon={Radar}
          eyebrow="Intelligence • Level 4"
          title="Intelligence Search"
          description="Scoped and routed, but the module itself is not built yet."
        />
      </Specimen>
      <Specimen name="ModuleCard" note="planned workspace module, per level">
        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-3">
          {LEVELS[4].nav[1].items.slice(0, 3).map((item) => (
            <ModuleCard key={item.id} icon={item.icon} label={item.label} group="Casework" />
          ))}
        </div>
      </Specimen>
      <Specimen name="SearchField" note="shared by topbar, records filter and RAG search">
        <div className="flex flex-col gap-space-sm">
          <SearchField placeholder="Search incidents, people, vehicles..." />
          <SearchField
            placeholder="With a trailing slot"
            trailing={<Badge tone="neutral">Ctrl+K</Badge>}
          />
        </div>
      </Specimen>
      <Specimen name="SectionCard / SectionHeader / PanelHeader" note="panel chrome">
        <div className="flex flex-col gap-space-md">
          <SectionCard>
            <SectionHeader
              icon={FolderOpen}
              title="Section header"
              subtitle="Icon, title, subtitle, badge and action"
              badge={<Badge tone="secondary">Badge</Badge>}
              action={<Badge tone="neutral">Action slot</Badge>}
            />
          </SectionCard>
          <SectionCard className="rounded-xl shadow-md">
            <PanelHeader
              title="Panel header // command style"
              badge={<Badge tone="neutral">Badge</Badge>}
              action={<span className="font-mono text-telemetry-code text-outline">ACTION SLOT</span>}
            />
          </SectionCard>
        </div>
      </Specimen>
      <Specimen name="PulseDot / FilterTabs / EntityChip" note="small interactive parts">
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center gap-space-md">
            {TONES.map((tone) => (
              <span key={tone} className="flex items-center gap-1.5">
                <PulseDot tone={tone} />
                <span className="font-mono text-label-sm text-outline">{tone}</span>
              </span>
            ))}
          </div>
          <FilterTabs tabs={INCIDENT_TABS} value={tab} onValueChange={setTab} />
          <div className="flex flex-wrap gap-1.5">
            {ENTITY_FILTERS.map((entity) => (
              <EntityChip key={entity.id} entity={entity} />
            ))}
          </div>
        </div>
      </Specimen>
    </SpecimenGroup>
  )
}
