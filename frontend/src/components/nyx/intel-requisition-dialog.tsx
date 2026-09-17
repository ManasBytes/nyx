import { Waypoints } from 'lucide-react'
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
const FIELD =
  'h-auto rounded border-transparent bg-surface-container px-space-md py-space-xs text-body-sm md:text-body-sm dark:bg-surface-container'

export function IntelRequisitionDialog({
  open,
  onOpenChange,
  agencies,
  onDispatch,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  agencies: string[]
  onDispatch?: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <Waypoints className="size-6 shrink-0 text-secondary" />
          <div>
            <DialogTitle>External &amp; Cross-District Intelligence Requisition</DialogTitle>
            <DialogDescription>NATGRID // CCTNS // State intelligence cell connector</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-space-sm">
          <Label className={LABEL}>Target Database / External Agency</Label>
          <select className={`${FIELD} w-full text-on-surface outline-none`}>
            {agencies.map((agency) => (
              <option key={agency}>{agency}</option>
            ))}
          </select>
          <Label className={`${LABEL} mt-space-xs`}>Query Target Entities / Identifiers</Label>
          <Input
            className={`${FIELD} font-mono`}
            placeholder="e.g. Munna Qureshi / Phone: +91-98401-XXXXX / Vehicle: TN-09-AK-4412"
          />
          <Label className={`${LABEL} mt-space-xs`}>Legal Justification &amp; FIR Mapping</Label>
          <Textarea
            rows={3}
            placeholder="Specify FIR number, statutory grounds, and DSP authority sanction under CrPC/BNS..."
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="surface" size="lg" className="uppercase">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="secondary-container"
            size="lg"
            className="font-bold uppercase"
            onClick={onDispatch}
          >
            Dispatch Requisition
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
