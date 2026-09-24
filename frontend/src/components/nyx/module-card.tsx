import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ModuleCard({
  icon: Icon,
  label,
  group,
  to,
}: {
  icon: LucideIcon
  label: string
  group: string
  to?: string
}) {
  const Wrapper = to ? Link : 'div'

  return (
    <Wrapper
      to={to as string}
      className="group flex flex-col justify-between gap-space-sm rounded-lg bg-surface-container p-space-md transition-colors hover:bg-surface-container-high">
      <div className="flex items-start justify-between gap-2">
        <Icon className="size-5 shrink-0 text-primary" />
        {to ? (
          <ArrowRight className="size-4 text-outline transition-transform group-hover:translate-x-0.5" />
        ) : (
          <Badge tone="outline">Soon</Badge>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-title-sm text-on-surface">{label}</span>
        <span className="font-mono text-label-sm text-outline uppercase">{group}</span>
      </div>
    </Wrapper>
  )
}
