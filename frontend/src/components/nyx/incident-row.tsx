import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Incident } from './types'

export function IncidentRow({
  incident,
  featured = false,
  onOpen,
}: {
  incident: Incident
  featured?: boolean
  onOpen?: (id: string) => void
}) {
  return (
    <div className="flex flex-col justify-between gap-space-md rounded bg-surface-container p-space-md shadow-sm transition-all hover:bg-surface-container-high md:flex-row md:items-center">
      <div className="flex min-w-0 items-start gap-space-md">
        <div className={cn('w-1.5 shrink-0 self-stretch rounded-full', incident.accentClassName)} />
        <div className="flex min-w-0 flex-col">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="font-mono text-telemetry-code font-bold text-primary">{incident.code}</span>
            <Badge tone={incident.priority.tone} emphasis="strong">
              {incident.priority.label}
            </Badge>
            <Badge tone={incident.status.tone}>{incident.status.label}</Badge>
            <span className="font-mono text-telemetry-code text-outline">• {incident.date}</span>
          </div>
          <h3 className="truncate text-title-sm text-on-surface">{incident.title}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-space-md text-body-sm text-on-surface-variant">
            {incident.meta.map((item) => (
              <span key={item.label} className="flex items-center gap-1">
                <item.icon className={cn('size-3.5', item.iconClassName ?? 'text-outline')} />
                <span className={item.mono ? 'font-mono text-telemetry-code' : undefined}>
                  {item.label}
                </span>
              </span>
            ))}
            <span className="font-mono text-label-sm text-outline">
              Updated {incident.updatedAt}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant={featured ? 'default' : 'surface'}
        size="lg"
        className="shrink-0 self-end text-title-sm md:self-center"
        onClick={() => onOpen?.(incident.id)}
      >
        Open Investigation
      </Button>
    </div>
  )
}
