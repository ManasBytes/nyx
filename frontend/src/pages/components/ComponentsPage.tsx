import { Bell, LayoutDashboard, Shapes, ShieldUser } from 'lucide-react'
import { AppHeader, AppShell, AppSidebar, HeaderActions, type NavGroup } from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'
import { STATION } from '@/lib/dashboard-data'
import { DspSpecimens } from './DspSpecimens'
import { InspectorSpecimens } from './InspectorSpecimens'
import { ShellSpecimens } from './ShellSpecimens'
import { TokenSpecimens } from './TokenSpecimens'
import { UiSpecimens } from './UiSpecimens'

const GALLERY_NAV: NavGroup[] = [
  {
    id: 'surfaces',
    label: 'Surfaces',
    items: [
      { id: 'inspector', label: 'Inspector Dashboard', icon: LayoutDashboard, to: '/' },
      { id: 'dsp', label: 'DSP Dashboard', icon: ShieldUser, to: '/dsp' },
      { id: 'components', label: 'Component Library', icon: Shapes, to: '/components' },
    ],
  },
]

export function ComponentsPage() {
  const { signOut } = useAuth()

  return (
    <AppShell
      sidebar={<AppSidebar groups={GALLERY_NAV} subtitle="Component Library" />}
      header={
        <AppHeader
          title="Component Library"
          subtitle="Every NYX component rendered with sample data"
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
      <div className="flex flex-col gap-space-xl py-space-md">
        <TokenSpecimens />
        <UiSpecimens />
        <ShellSpecimens />
        <InspectorSpecimens />
        <DspSpecimens />
      </div>
    </AppShell>
  )
}
