import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DirectCaseCard } from './direct-case-card'
import { PanelHeader } from './panel-header'
import { SectionCard } from './section-card'
import type { DirectCase } from './types'

export function DirectCasesPanel({
  cases,
  onOpenCase,
  onCreate,
}: {
  cases: DirectCase[]
  onOpenCase?: (id: string) => void
  onCreate?: () => void
}) {
  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        tone="tertiary"
        title="My Direct Investigations // DSP Lead"
        badge={<Badge tone="tertiary">Special Mandate</Badge>}
        action={
          <Button variant="link" size="xs" className="font-mono text-label-sm uppercase" onClick={onCreate}>
            <Plus />
            Create Direct Case
          </Button>
        }
      />
      <div className="mt-space-sm grid grid-cols-1 gap-space-sm md:grid-cols-2">
        {cases.map((item) => (
          <DirectCaseCard key={item.id} directCase={item} onOpen={onOpenCase} />
        ))}
      </div>
    </SectionCard>
  )
}
