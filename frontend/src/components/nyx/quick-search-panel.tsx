import { useState } from 'react'
import { ScanSearch, Radar } from 'lucide-react'
import { EntityChip } from './entity-chip'
import { SearchField } from './search-field'
import { SectionCard } from './section-card'
import type { EntityFilter } from './types'

export function QuickSearchPanel({
  entities,
  onSearch,
  onSelectEntity,
}: {
  entities: EntityFilter[]
  onSearch?: (query: string) => void
  onSelectEntity?: (id: string) => void
}) {
  const [query, setQuery] = useState('')

  return (
    <SectionCard>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Radar className="size-4.5 text-primary" />
          <span className="text-title-sm text-on-surface">Quick Investigation Search</span>
        </div>
        <span className="font-mono text-label-sm text-tertiary">SEMANTIC &amp; RAG ON</span>
      </div>
      <p className="mb-3 text-body-sm text-on-surface-variant">
        Instant entity lookup across central station case files and intelligence records.
      </p>
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch?.(query)
        }}
      >
        <SearchField
          icon={ScanSearch}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Target name, IMEI, bank account, vehicle #..."
          className="font-mono text-telemetry-code"
          trailing={
            <button
              type="submit"
              className="rounded bg-primary-container px-2 py-1 font-mono text-label-sm font-bold text-on-primary-container transition-colors hover:bg-primary-container/80"
            >
              RUN
            </button>
          }
        />
      </form>
      <div className="flex flex-wrap gap-1.5">
        {entities.map((entity) => (
          <EntityChip key={entity.id} entity={entity} onClick={onSelectEntity} />
        ))}
      </div>
    </SectionCard>
  )
}
