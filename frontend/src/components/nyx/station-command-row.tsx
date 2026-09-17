import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Station, Tone } from './types'

const counterClass: Partial<Record<Tone, string>> = {
  primary: 'text-primary',
  error: 'text-error',
  outline: 'text-outline',
}

export function StationCommandRow({
  station,
  onInspect,
  onDossier,
}: {
  station: Station
  onInspect?: (id: string) => void
  onDossier?: (id: string) => void
}) {
  return (
    <div className="flex flex-col justify-between gap-space-sm rounded-lg bg-surface-container p-space-sm transition-all hover:bg-surface-container-high md:flex-row md:items-center">
      <div className="flex min-w-0 items-center gap-space-sm">
        <div className="flex size-9 shrink-0 items-center justify-center rounded bg-surface-container-highest font-mono text-label-lg font-bold text-primary">
          {station.code}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="text-title-sm text-on-surface">{station.name}</span>
            <Badge tone={station.tag.tone} className="text-telemetry-code">
              {station.tag.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 truncate text-body-sm text-on-surface-variant">
            <span>SHO: {station.sho}</span>
            <span className="text-outline">•</span>
            <span className="font-mono text-telemetry-code text-outline">
              Last active: {station.lastActive}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-space-md md:justify-end">
        <div className="flex items-center gap-space-sm font-mono text-telemetry-code">
          {station.counters.map((counter) => (
            <div key={counter.label} className="flex flex-col">
              <span className={cn('font-semibold', counterClass[counter.tone ?? 'neutral'] ?? 'text-on-surface')}>
                {counter.value}
              </span>
              <span className="text-[9px] text-outline uppercase">{counter.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-space-xs">
          <Button variant="surface" size="xs" className="uppercase" onClick={() => onInspect?.(station.id)}>
            Inspect
          </Button>
          <Button variant="secondary" size="xs" className="uppercase" onClick={() => onDossier?.(station.id)}>
            Dossier
          </Button>
        </div>
      </div>
    </div>
  )
}
