import { Avatar } from 'radix-ui'
import { UserSearch } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { WantedPerson } from './types'

export function WantedPersonCard({
  person,
  onViewProfile,
}: {
  person: WantedPerson
  onViewProfile?: (id: string) => void
}) {
  return (
    <div className="flex items-start gap-space-sm rounded bg-surface-container p-space-sm transition-colors hover:bg-surface-container-high">
      <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded bg-surface-container-lowest">
        <Avatar.Root className="block size-full">
          <Avatar.Image src={person.photoUrl} alt={person.name} className="size-full object-cover" />
          <Avatar.Fallback className="flex size-full items-center justify-center text-outline">
            <UserSearch className="size-5" />
          </Avatar.Fallback>
        </Avatar.Root>
        {person.tier ? (
          <span className="absolute inset-x-0 bottom-0 bg-error/80 text-center font-mono text-[8px] font-bold text-on-error uppercase">
            {person.tier}
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-title-sm font-bold text-on-surface">{person.name}</span>
          {person.reward ? (
            <span className="shrink-0 font-mono text-telemetry-code font-bold text-error">
              {person.reward}
            </span>
          ) : person.flag ? (
            <Badge tone={person.flag.tone} emphasis="strong">
              {person.flag.label}
            </Badge>
          ) : null}
        </div>
        <div className="mt-0.5 font-mono text-telemetry-code text-outline">
          ID: {person.code} • {person.linkedIncidents}
        </div>
        <div className="mt-1 truncate text-body-sm text-on-surface-variant">Last: {person.lastSeen}</div>
        {person.chips ? (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {person.chips.map((chip) => (
              <Badge key={chip.label} tone={chip.tone}>
                {chip.label}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="font-mono text-label-sm text-error">{person.note}</span>
            <button
              type="button"
              onClick={() => onViewProfile?.(person.id)}
              className="font-mono text-label-sm font-semibold text-primary hover:underline"
            >
              View Profile →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
