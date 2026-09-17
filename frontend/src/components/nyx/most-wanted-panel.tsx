import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SectionCard, SectionHeader } from './section-card'
import { WantedPersonCard } from './wanted-person-card'
import type { WantedPerson } from './types'

export function MostWantedPanel({
  people,
  activeCount,
  header,
  showViewAll = true,
  onViewProfile,
  onViewAll,
}: {
  people: WantedPerson[]
  activeCount: number
  header?: ReactNode
  showViewAll?: boolean
  onViewProfile?: (id: string) => void
  onViewAll?: () => void
}) {
  return (
    <SectionCard>
      {header ?? (
      <SectionHeader
        icon={TriangleAlert}
        iconClassName="text-error"
        title="Most Wanted"
        subtitle="Station jurisdiction pursuits"
        action={
          <Badge tone="error" emphasis="strong">
            {activeCount} Active
          </Badge>
        }
      />
      )}
      <div className="flex flex-col gap-space-sm">
        {people.map((person) => (
          <WantedPersonCard key={person.id} person={person} onViewProfile={onViewProfile} />
        ))}
      </div>
      {showViewAll ? (
        <button
          type="button"
          onClick={onViewAll}
          className="mt-3 block w-full rounded bg-surface-container py-1.5 text-center font-mono text-label-md text-outline transition-colors hover:text-on-surface"
        >
          View All Station Warrants ({activeCount}) →
        </button>
      ) : null}
    </SectionCard>
  )
}
