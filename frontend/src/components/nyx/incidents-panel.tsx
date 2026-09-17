import { useState } from 'react'
import { ChevronRight, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FilterTabs } from './filter-tabs'
import { IncidentRow } from './incident-row'
import { SectionCard, SectionHeader } from './section-card'
import type { FilterTab, Incident } from './types'

export function IncidentsPanel({
  incidents,
  tabs,
  totalCount,
  onOpenIncident,
  onViewAll,
  onTabChange,
}: {
  incidents: Incident[]
  tabs: FilterTab[]
  totalCount: number
  onOpenIncident?: (id: string) => void
  onViewAll?: () => void
  onTabChange?: (id: string) => void
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '')

  return (
    <SectionCard>
      <SectionHeader
        icon={FolderOpen}
        title="My Investigations"
        subtitle="Criminal case management • Central jurisdiction"
        action={
          <Button variant="link" size="sm" className="text-primary" onClick={onViewAll}>
            View All Incidents ({totalCount})
            <ChevronRight />
          </Button>
        }
      />
      <FilterTabs
        tabs={tabs}
        value={activeTab}
        onValueChange={(id) => {
          setActiveTab(id)
          onTabChange?.(id)
        }}
      />
      <div className="flex flex-col gap-space-xs">
        {incidents.map((incident, index) => (
          <IncidentRow
            key={incident.id}
            incident={incident}
            featured={index === 0}
            onOpen={onOpenIncident}
          />
        ))}
      </div>
    </SectionCard>
  )
}
