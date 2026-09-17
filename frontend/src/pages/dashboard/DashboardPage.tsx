import { Bell } from 'lucide-react'
import {
  AppHeader,
  AppShell,
  AppSidebar,
  HeaderActions,
  DspChannelPanel,
  EvidencePanel,
  IncidentsPanel,
  MostWantedPanel,
  NotebooksPanel,
  QuickSearchPanel,
  StationRecordsPanel,
  SystemStatusBar,
} from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'
import { INSPECTOR_NAV } from '@/lib/nav-items'
import {
  ENTITY_FILTERS,
  ESCALATIONS,
  EVIDENCE_ASSETS,
  INCIDENTS,
  INCIDENT_TABS,
  NOTEBOOKS,
  RECORD_CATEGORIES,
  STATION,
  SYSTEM_STATUS,
  WANTED_PEOPLE,
} from '@/lib/dashboard-data'
import { DashboardOverview } from './DashboardOverview'

export function DashboardPage() {
  const { signOut } = useAuth()

  return (
    <AppShell
      sidebar={<AppSidebar groups={INSPECTOR_NAV} subtitle={STATION.name} />}
      header={
        <AppHeader
          pageLabel="Inspector Dashboard"
          user={STATION.officer}
          onSignOut={signOut}
          actions={
            <HeaderActions
              commsCount={3}
              counters={[{ id: 'alerts', icon: Bell, tone: 'primary', label: 'Notifications' }]}
            />
          }
        />
      }
    >
      <SystemStatusBar {...SYSTEM_STATUS} />
      <DashboardOverview />
      <div className="grid grid-cols-1 items-start gap-space-lg xl:grid-cols-12">
        <div className="flex flex-col gap-space-lg xl:col-span-8">
          <IncidentsPanel incidents={INCIDENTS} tabs={INCIDENT_TABS} totalCount={12} />
          <NotebooksPanel notebooks={NOTEBOOKS} />
          <StationRecordsPanel
            categories={RECORD_CATEGORIES}
            totalCount="1,284"
            updatedToday={32}
          />
        </div>
        <div className="flex flex-col gap-space-lg xl:col-span-4">
          <DspChannelPanel
            channelName="DSP Crime Branch // Operational Link"
            clearance="TIER-1"
            requests={ESCALATIONS}
          />
          <MostWantedPanel people={WANTED_PEOPLE} activeCount={14} />
          <EvidencePanel assets={EVIDENCE_ASSETS} />
          <QuickSearchPanel entities={ENTITY_FILTERS} />
        </div>
      </div>
    </AppShell>
  )
}
