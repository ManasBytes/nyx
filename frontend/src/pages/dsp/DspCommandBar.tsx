import { BookPlus, Megaphone, PlusCircle, Radar, ShieldCheck, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WelcomePanel } from '@/components/nyx'

export function DspCommandBar({
  greeting,
  onEscalate,
  onIntel,
}: {
  greeting: string
  onEscalate: () => void
  onIntel: () => void
}) {
  return (
    <WelcomePanel
      icon={ShieldCheck}
      title={greeting}
      titleBadges={
        <>
          <Badge tone="tertiary" emphasis="strong" className="tracking-wider">
            C2 Operational Grid Live
          </Badge>
          <span className="font-mono text-telemetry-code text-outline">STN-SYNC: 8/8 ONLINE</span>
        </>
      }
      description={
        <>
          Zonal operational posture is active across 8 subordinate police stations.{' '}
          <span className="font-semibold text-error">4 Critical alerts</span> and{' '}
          <span className="font-semibold text-primary-container">12 sanction requests</span> require
          DSP authorization.
        </>
      }
      actions={
        <>
          <Button variant="primary-container" className="font-mono text-label-md uppercase" onClick={onEscalate}>
            <Megaphone />
            Escalate to Commissioner
          </Button>
          <Button variant="surface" className="font-mono text-label-md text-secondary uppercase" onClick={onIntel}>
            <Share2 />
            External Intel
          </Button>
          <div className="mx-1 hidden h-6 w-px bg-surface-variant sm:block" />
          <Button variant="surface" className="font-mono text-label-md uppercase">
            <PlusCircle />
            Zonal Incident
          </Button>
          <Button variant="surface" className="font-mono text-label-md uppercase">
            <BookPlus />
            New Notebook
          </Button>
          <Button variant="surface" size="icon" aria-label="RAG / Entity search" className="text-primary">
            <Radar />
          </Button>
        </>
      }
    />
  )
}
