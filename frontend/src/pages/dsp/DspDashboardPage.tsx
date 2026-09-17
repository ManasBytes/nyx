import { useState } from 'react'
import { Bell, Building2, FileCheck } from 'lucide-react'
import {
  AppHeader,
  AppShell,
  AppSidebar,
  EscalateBriefDialog,
  HeaderActions,
  IntelRequisitionDialog,
  MetricCard,
  SidebarProfile,
} from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'
import { DSP_NAV } from '@/lib/dsp-nav-items'
import {
  DSP,
  DSP_METRICS,
  ESCALATION_DRAFT,
  INTEL_AGENCIES,
} from '@/lib/dsp-dashboard-data'
import { greetingFor } from '@/lib/greeting'
import { DspCommandBar } from './DspCommandBar'
import { DspSignalsColumn } from './DspSignalsColumn'
import { DspSupervisionColumn } from './DspSupervisionColumn'

const SEARCH = 'Search incidents, suspects, phone nos, vehicles, assets, FIRs...'

export function DspDashboardPage() {
  const { signOut } = useAuth()
  const [escalateOpen, setEscalateOpen] = useState(false)
  const [intelOpen, setIntelOpen] = useState(false)

  return (
    <AppShell
      sidebarWidth="18rem"
      topbarHeight="4rem"
      sidebar={
        <AppSidebar
          groups={DSP_NAV}
          clearance="CLEARANCE-V"
          link={{ label: 'C2 JURISDICTION', status: 'SECURE GRID' }}
          footer={
            <SidebarProfile
              name={DSP.officer.name}
              role={DSP.officer.role}
              meta={DSP.stationsSynced}
              metaIcon={Building2}
              onSignOut={signOut}
            />
          }
        />
      }
      header={
        <AppHeader
          title="DSP Dashboard"
          subtitle={`Jurisdiction Overview — ${DSP.zone}`}
          user={DSP.headerUser}
          searchPlaceholder={SEARCH}
          actions={
            <HeaderActions
              counters={[
                { id: 'requests', icon: FileCheck, count: 12, tone: 'secondary', label: 'Requests' },
                { id: 'alerts', icon: Bell, count: 4, tone: 'error', label: 'Alerts' },
              ]}
            />
          }
        />
      }
    >
      <DspCommandBar
        greeting={`${greetingFor()}, DSP Ramanathan.`}
        onEscalate={() => setEscalateOpen(true)}
        onIntel={() => setIntelOpen(true)}
      />
      <div className="my-space-lg grid grid-cols-2 gap-space-sm md:grid-cols-3 lg:grid-cols-6">
        {DSP_METRICS.map((stat) => (
          <MetricCard key={stat.id} stat={stat} variant="compact" />
        ))}
      </div>
      <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
        <DspSupervisionColumn onEscalate={() => setEscalateOpen(true)} />
        <DspSignalsColumn
          onEscalate={() => setEscalateOpen(true)}
          onIntel={() => setIntelOpen(true)}
        />
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
    </AppShell>
  )
}
