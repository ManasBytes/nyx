import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-react'
import {
  DirectCasesPanel,
  FlaggedCasesPanel,
  NotebooksPanel,
  PanelHeader,
  StationCommandPanel,
} from '@/components/nyx'
import {
  DIRECT_CASES,
  DSP_NOTEBOOKS,
  FLAGGED_CASES,
  STATIONS,
} from '@/lib/dsp-dashboard-data'

export function DspSupervisionColumn({ onEscalate }: { onEscalate: () => void }) {
  return (
    <div className="flex flex-col gap-space-lg lg:col-span-7 xl:col-span-8">
      <StationCommandPanel
        stations={STATIONS}
        totalLabel="8 STATIONS"
        recordsScoped="9,842 RECORDS SCOPED"
        recordsDelta="+148 Today"
        collapsedNote="+ Flower Bazaar, Royapuram, Kilpauk, Chintadripet (All synchronized)"
      />
      <FlaggedCasesPanel
        cases={FLAGGED_CASES}
        badgeLabel="7 cases require DSP action"
        onPrimary={onEscalate}
      />
      <DirectCasesPanel cases={DIRECT_CASES} />
      <NotebooksPanel
        notebooks={DSP_NOTEBOOKS}
        variant="row"
        columns="md:grid-cols-2"
        header={
          <PanelHeader
            tone="secondary"
            title="Supervisory Dossier Notebooks"
            badge={<Badge tone="outline">Tiptap Secure</Badge>}
            action={
              <Button variant="link" size="xs" className="font-mono text-label-sm uppercase">
                <SquarePen />
                New Notebook
              </Button>
            }
          />
        }
      />
    </div>
  )
}
