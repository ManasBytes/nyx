import { NavLink } from 'react-router-dom'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import type { NavItem } from './types'

const base = 'flex items-center gap-space-sm rounded px-space-sm py-space-sm transition-colors'
const idle = 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
const active = 'border-l-2 border-primary-container bg-surface-container-high font-bold text-primary'

export function SidebarNavItem({
  item,
  collapsed = false,
}: {
  item: NavItem
  collapsed?: boolean
}) {
  const { icon: Icon, label, badge, badgeTone = 'secondary', to } = item
  const body = (
    <>
      <Icon className="size-4.5 shrink-0" />
      {collapsed ? null : (
        <>
          <span className="flex-1 truncate text-body-md">{label}</span>
          {badge === undefined ? null : <Badge tone={badgeTone}>{badge}</Badge>}
        </>
      )}
    </>
  )

  if (!to) {
    return (
      <span
        title={collapsed ? label : `${label} — not built yet`}
        aria-disabled
        className={cn(base, 'cursor-default text-outline', collapsed && 'justify-center')}
      >
        {body}
      </span>
    )
  }

  return (
    <NavLink
      to={to}
      end={to === '/'}
      title={collapsed ? label : undefined}
      className={({ isActive }) => cn(base, isActive ? active : idle, collapsed && 'justify-center')}
    >
      {body}
    </NavLink>
  )
}
