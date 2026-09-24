import { LevelShell } from '@/pages/levels/LevelShell'
import { RECORD_CATEGORIES, STATION } from '@/lib/dashboard-data'
import { ManageData } from './ManageData'

export function StationDataPage() {
  return (
    <LevelShell level={5} title="Station Records">
      <ManageData
        scopeKind="Station scope"
        scopeLabel={STATION.name}
        categories={RECORD_CATEGORIES}
        totalCount="1,284"
        updatedToday={32}
      />
    </LevelShell>
  )
}
