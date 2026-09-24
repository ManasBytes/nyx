import { LevelShell } from '@/pages/levels/LevelShell'
import { DSP, STATIONS, ZONE_RECORD_CATEGORIES } from '@/lib/dsp-dashboard-data'
import { ManageData } from './ManageData'

const STATION_NAMES = STATIONS.map((station) => station.name)

export function ZoneDataPage() {
  return (
    <LevelShell level={4} title="Zone Records">
      <ManageData
        scopeKind="Zone scope"
        scopeLabel={DSP.zone}
        categories={ZONE_RECORD_CATEGORIES}
        totalCount="9,842"
        updatedToday={148}
        stations={STATION_NAMES}
        delegateFor={(name) => STATIONS.find((station) => station.name === name)?.sho}
      />
    </LevelShell>
  )
}
