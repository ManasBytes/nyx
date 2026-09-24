import { useState, type ReactNode } from 'react'
import { Bell, FileCheck } from 'lucide-react'
import { AppHeader, AppShell, AppSidebar, HeaderActions } from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'
import { getUserScope } from '@/lib/auth'
import { LEVELS, type LevelId } from '@/lib/levels'

const SEARCH = 'Search incidents, people, vehicles, phone numbers, assets...'

export function LevelShell({
  level,
  title,
  children,
}: {
  level: LevelId
  title: string
  children: ReactNode
}) {
  const { email, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const config = LEVELS[level]
  const scope = getUserScope()
  const name = email?.split('@')[0] ?? config.label

  return (
    <AppShell
      sidebarWidth={collapsed ? '4rem' : '17rem'}
      topbarHeight="4rem"
      sidebar={
        <AppSidebar
          groups={config.nav}
          subtitle={config.title}
          clearance={`LEVEL ${config.level}`}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((prev) => !prev)}
        />
      }
      header={
        <AppHeader
          title={title}
          subtitle={scope ? `${config.scopeKind} — ${scope}` : config.scopeKind}
          user={{ name, role: `${config.label} • Level ${config.level}` }}
          searchPlaceholder={SEARCH}
          onSignOut={signOut}
          actions={
            <HeaderActions
              counters={[
                { id: 'requests', icon: FileCheck, tone: 'secondary', label: 'Requests' },
                { id: 'alerts', icon: Bell, tone: 'error', label: 'Alerts' },
              ]}
            />
          }
        />
      }
    >
      {children}
    </AppShell>
  )
}
