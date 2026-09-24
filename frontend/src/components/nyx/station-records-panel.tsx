import type { ReactNode } from 'react'
import { ExternalLink, FolderCog, ScanSearch } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RecordCategoryCard } from './record-category-card'
import { SearchField } from './search-field'
import { SectionCard, SectionHeader } from './section-card'
import type { RecordCategory } from './types'

export function StationRecordsPanel({
  categories,
  totalCount,
  updatedToday,
  header,
  onOpenRecords,
  onOpenCategory,
  onLogNew,
  onFilterChange,
}: {
  categories: RecordCategory[]
  totalCount: string
  updatedToday: number
  header?: ReactNode
  onOpenRecords?: () => void
  onOpenCategory?: (id: string) => void
  onLogNew?: (id: string) => void
  onFilterChange?: (value: string) => void
}) {
  return (
    <SectionCard>
      {header ?? (
      <SectionHeader
        icon={FolderCog}
        iconClassName="text-tertiary"
        title="Station Records Management"
        subtitle={`${updatedToday} updated today • Central police station scope`}
        badge={<Badge tone="tertiary">{totalCount} Total</Badge>}
        action={
          <Button variant="surface" size="lg" className="text-title-sm" onClick={onOpenRecords}>
            Open Station Records
            <ExternalLink />
          </Button>
        }
      />
      )}
      <div className="mb-space-md">
        <SearchField
          icon={ScanSearch}
          placeholder="Filter station records by FIR #, Plate, or Aadhaar/UID..."
          onChange={(event) => onFilterChange?.(event.target.value)}
          trailing={<span className="font-mono text-label-sm text-outline">CCTNS MAPPED</span>}
        />
      </div>
      <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-4">
        {categories.map((category) => (
          <RecordCategoryCard
            key={category.id}
            category={category}
            onOpen={onOpenCategory}
            onLogNew={onLogNew}
          />
        ))}
      </div>
    </SectionCard>
  )
}
