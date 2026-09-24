import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { DataScopeBar, PanelHeader, StationRecordsPanel } from '@/components/nyx'
import type { RecordCategory } from '@/components/nyx'
import { UploadPanel } from './UploadPanel'

export function ManageData({
  scopeKind,
  scopeLabel,
  categories,
  totalCount,
  updatedToday,
  stations,
  delegateFor,
}: {
  scopeKind: string
  scopeLabel: string
  categories: RecordCategory[]
  totalCount: string
  updatedToday: number
  stations?: string[]
  delegateFor?: (station: string) => string | undefined
}) {
  const [station, setStation] = useState('')
  const managing = station || scopeLabel

  return (
    <>
      <DataScopeBar
        scopeKind={scopeKind}
        scopeLabel={scopeLabel}
        stations={stations}
        station={station}
        delegate={station ? delegateFor?.(station) : undefined}
        onStationChange={setStation}
      />
      <div className="grid grid-cols-1 items-start gap-space-lg xl:grid-cols-12">
        <div className="xl:col-span-5">
          <UploadPanel scopeLabel={managing} />
        </div>
        <div className="xl:col-span-7">
          <StationRecordsPanel
            categories={categories}
            totalCount={totalCount}
            updatedToday={updatedToday}
            header={
              <PanelHeader
                tone="tertiary"
                title="Records Management"
                badge={<Badge tone="tertiary">{totalCount} records</Badge>}
                action={
                  <span className="font-mono text-telemetry-code text-outline">
                    {updatedToday} UPDATED TODAY
                  </span>
                }
              />
            }
          />
        </div>
      </div>
    </>
  )
}
