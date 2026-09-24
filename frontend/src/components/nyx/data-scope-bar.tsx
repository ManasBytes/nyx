import { Building2, UserCog } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SelectField } from './select-field'

export function DataScopeBar({
  scopeKind,
  scopeLabel,
  stations,
  station,
  delegate,
  onStationChange,
}: {
  scopeKind: string
  scopeLabel: string
  stations?: string[]
  station?: string
  delegate?: string
  onStationChange?: (station: string) => void
}) {
  return (
    <div className="mb-space-lg flex flex-col justify-between gap-space-md rounded-xl bg-surface-container-low p-space-md shadow-sm lg:flex-row lg:items-center">
      <div className="flex items-center gap-space-sm">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-surface-container-high">
          <Building2 className="size-5 text-primary" />
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-label-sm tracking-wider text-outline uppercase">
            {scopeKind}
          </span>
          <span className="text-title-sm text-on-surface">{scopeLabel}</span>
        </div>
      </div>
      {stations ? (
        <div className="flex flex-col gap-space-xs sm:flex-row sm:items-end sm:gap-space-md">
          {delegate ? (
            <Badge tone="secondary" emphasis="strong" className="h-fit self-start sm:self-center">
              <UserCog className="size-3" />
              Acting for {delegate}
            </Badge>
          ) : null}
          <SelectField
            id="manage-station"
            label="Manage station data"
            options={stations}
            value={station ?? ''}
            placeholder="Entire zone"
            onChange={(event) => onStationChange?.(event.target.value)}
            className="sm:w-72"
          />
        </div>
      ) : null}
    </div>
  )
}
