import { Megaphone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const LABEL = 'font-mono text-label-sm text-outline uppercase'

export function EscalateBriefDialog({
  open,
  onOpenChange,
  subject,
  incidents,
  summary,
  onTransmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject: string
  incidents: string[]
  summary: string
  onTransmit?: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <Megaphone className="size-6 shrink-0 text-primary-container" />
          <div>
            <DialogTitle>Escalate / Direct Briefing to Commissioner of Police</DialogTitle>
            <DialogDescription>Office of CP • Encrypted dispatch tier-1</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-space-sm">
          <Label className={LABEL}>Subject / Operational Urgency</Label>
          <Input
            defaultValue={subject}
            className="h-auto rounded border-transparent bg-surface-container px-space-md py-space-xs text-body-md md:text-body-md dark:bg-surface-container"
          />
          <Label className={`${LABEL} mt-space-xs`}>Associated Zone Incidents</Label>
          <div className="flex flex-wrap items-center gap-space-xs">
            {incidents.map((incident) => (
              <Badge key={incident} tone="neutral" className="px-2 py-1 text-telemetry-code text-primary">
                {incident}
              </Badge>
            ))}
          </div>
          <Label className={`${LABEL} mt-space-xs`}>Executive Summary / Proposed Sanctions</Label>
          <Textarea rows={4} defaultValue={summary} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="surface" size="lg" className="uppercase">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary-container" size="lg" className="font-bold uppercase" onClick={onTransmit}>
            Transmit Encrypted Briefing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
