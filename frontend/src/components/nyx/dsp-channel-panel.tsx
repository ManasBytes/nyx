import { BellPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EscalationRequestCard } from './escalation-request-card'
import { PulseDot } from './pulse-dot'
import { SectionCard } from './section-card'
import type { EscalationRequest } from './types'

export function DspChannelPanel({
  channelName,
  clearance,
  requests,
  onCreate,
  onTrack,
}: {
  channelName: string
  clearance: string
  requests: EscalationRequest[]
  onCreate?: () => void
  onTrack?: (id: string) => void
}) {
  return (
    <SectionCard>
      <div className="mb-space-md rounded bg-surface-container-lowest p-space-md">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <PulseDot tone="secondary" className="size-2.5" />
            <span className="font-mono text-label-sm font-bold tracking-wider text-secondary">
              {channelName}
            </span>
          </div>
          <span className="font-mono text-telemetry-code text-tertiary">ENCRYPTED</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-body-sm text-on-surface-variant">
          <span>Direct Secure Channel Active</span>
          <span className="font-mono text-label-sm text-outline">CLEARANCE: {clearance}</span>
        </div>
        <Button
          variant="secondary-container"
          size="lg"
          className="mt-3 w-full text-title-sm"
          onClick={onCreate}
        >
          <BellPlus />
          Create Escalation Request / Inform DSP
        </Button>
      </div>
      <div className="flex flex-col gap-space-sm">
        <div className="px-1 font-mono text-label-sm tracking-wider text-outline uppercase">
          Active Directives &amp; Petitions
        </div>
        {requests.map((request) => (
          <EscalationRequestCard key={request.id} request={request} onAction={onTrack} />
        ))}
      </div>
    </SectionCard>
  )
}
