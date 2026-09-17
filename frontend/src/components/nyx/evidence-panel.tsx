import type { ReactNode } from 'react'
import { Images } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EvidenceAssetRow } from './evidence-asset-row'
import { SectionCard, SectionHeader } from './section-card'
import type { EvidenceAsset } from './types'

export function EvidencePanel({
  assets,
  header,
  onOpenAsset,
}: {
  assets: EvidenceAsset[]
  header?: ReactNode
  onOpenAsset?: (id: string) => void
}) {
  return (
    <SectionCard>
      {header ?? (
      <SectionHeader
        icon={Images}
        iconClassName="text-secondary"
        title="Evidence Ingest Pipeline"
        subtitle="Real-time forensic & digital streams"
        action={<Badge tone="secondary">LIVE FEED</Badge>}
      />
      )}
      <div className="flex flex-col gap-space-xs">
        {assets.map((asset) => (
          <EvidenceAssetRow key={asset.id} asset={asset} onOpen={onOpenAsset} />
        ))}
      </div>
    </SectionCard>
  )
}
