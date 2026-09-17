import { NavLink } from 'react-router-dom'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import type { NavItem } from './types'

const base =
  'flex items-center justify-between gap-space-sm rounded px-space-sm py-space-sm transition-colors'
const inactive = 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
const active = 'border-l-2 border-primary-container bg-surface-container-high font-bold text-primary'

export function SidebarNavItem({ item }: { item: NavItem }) {
  const { icon: Icon, label, badge, badgeTone = 'secondary', to = '#' } = item

  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => cn(base, isActive ? active : inactive)}
    >
      <span className="flex items-center gap-space-sm">
        <Icon className="size-4.5 shrink-0" />
        <span className="text-body-md">{label}</span>
      </span>
      {badge === undefined ? null : (
        <Badge tone={badgeTone} className={badgeTone === 'primary' ? 'text-primary' : undefined}>
          {badge}
        </Badge>
      )}
    </NavLink>
  )
}
