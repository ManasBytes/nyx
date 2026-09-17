import type { ReactNode } from 'react'
import { Shield } from 'lucide-react'
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
}: {
  groups: NavGroup[]
  subtitle?: string
  clearance?: string
  link?: { label: string; status: string }
  footer?: ReactNode
}) {
  return (
    <aside className="fixed top-0 left-0 z-50 flex h-full w-sidebar flex-col justify-between bg-surface-container-lowest select-none">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col gap-space-sm bg-surface-container-low/50 px-space-md py-space-sm">
          <div className="flex items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <Shield className="size-6 shrink-0 text-primary-container" />
              <div className="flex flex-col">
                <span className="font-mono text-label-lg tracking-wider text-primary">
                  {APP_CODENAME}
                </span>
                {subtitle ? (
                  <span className="font-mono text-label-sm text-outline uppercase">{subtitle}</span>
                ) : null}
              </div>
            </div>
            {clearance ? <Badge tone="tertiary">{clearance}</Badge> : null}
          </div>
          {link ? (
            <div className="flex items-center justify-between rounded bg-surface-container px-space-xs py-space-xs">
              <span className="flex items-center gap-space-xs">
                <PulseDot tone="tertiary" className="size-1.5" />
                <span className="font-mono text-telemetry-code text-on-surface">{link.label}</span>
              </span>
              <span className="font-mono text-label-sm font-semibold text-secondary">{link.status}</span>
            </div>
          ) : null}
        </div>
        <div className="flex-1 overflow-y-auto px-space-sm py-space-md">
          {groups.map((group) => (
            <nav key={group.id} className="flex flex-col gap-0.5">
              {group.label ? (
                <div className="px-space-sm pt-space-xs pb-space-xs font-mono text-label-sm tracking-wider text-outline uppercase">
                  {group.label}
                </div>
              ) : null}
              {group.items.map((item) => (
                <SidebarNavItem key={item.id} item={item} />
              ))}
            </nav>
          ))}
        </div>
      </div>
      {footer ?? <SidebarStatus label="SEC-NET: SECURE" version={APP_VERSION} />}
    </aside>
  )
}
