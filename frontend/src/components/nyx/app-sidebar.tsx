import type { ReactNode } from 'react'
import { PanelLeftClose, PanelLeftOpen, Shield } from 'lucide-react'
import { cn } from 'cn'
import { APP_CODENAME, APP_VERSION } from '@/config/main.config'
import { Badge } from '@/components/ui/badge'
import { PulseDot } from './pulse-dot'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarStatus } from './sidebar-status'
import type { NavGroup } from './types'

export function AppSidebar({
  groups,
  subtitle,
  clearance,
  link,
  footer,
  collapsed = false,
  onToggleCollapsed,
}: {
  groups: NavGroup[]
  subtitle?: string
  clearance?: string
  link?: { label: string; status: string }
  footer?: ReactNode
  collapsed?: boolean
  onToggleCollapsed?: () => void
}) {
  return (
    <aside className="fixed top-0 left-0 z-50 flex h-full w-sidebar flex-col justify-between bg-surface-container-lowest select-none">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col gap-space-sm bg-surface-container-low/50 px-space-md py-space-sm">
          <div className="flex items-center justify-between gap-space-xs">
            <div className="flex min-w-0 items-center gap-space-sm">
              <Shield className="size-6 shrink-0 text-primary-container" />
              {collapsed ? null : (
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-label-lg tracking-wider text-primary">
                    {APP_CODENAME}
                  </span>
                  {subtitle ? (
                    <span className="truncate font-mono text-label-sm text-outline uppercase">
                      {subtitle}
                    </span>
                  ) : null}
                </div>
              )}
            </div>
            {onToggleCollapsed ? (
              <button
                type="button"
                onClick={onToggleCollapsed}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="rounded p-1 text-outline transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
              </button>
            ) : null}
            {clearance && !collapsed ? <Badge tone="tertiary">{clearance}</Badge> : null}
          </div>
          {link && !collapsed ? (
            <div className="flex items-center justify-between rounded bg-surface-container px-space-xs py-space-xs">
              <span className="flex items-center gap-space-xs">
                <PulseDot tone="tertiary" className="size-1.5" />
                <span className="font-mono text-telemetry-code text-on-surface">{link.label}</span>
              </span>
              <span className="font-mono text-label-sm font-semibold text-secondary">{link.status}</span>
            </div>
          ) : null}
        </div>
        <div className={cn('flex-1 overflow-y-auto py-space-md', collapsed ? 'px-space-xs' : 'px-space-sm')}>
          {groups.map((group) => (
            <nav key={group.id} className="flex flex-col gap-0.5">
              {group.label && !collapsed ? (
                <div className="px-space-sm pt-space-xs pb-space-xs font-mono text-label-sm tracking-wider text-outline uppercase">
                  {group.label}
                </div>
              ) : null}
              {group.items.map((item) => (
                <SidebarNavItem key={item.id} item={item} collapsed={collapsed} />
              ))}
            </nav>
          ))}
        </div>
      </div>
      {collapsed ? null : footer ?? <SidebarStatus label="SEC-NET: SECURE" version={APP_VERSION} />}
    </aside>
  )
}
