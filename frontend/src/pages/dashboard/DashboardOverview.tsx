import { NotebookPen, RadioTower } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricCard, WelcomePanel } from '@/components/nyx'
import { METRICS, STATION } from '@/lib/dashboard-data'
import { greetingFor } from '@/lib/greeting'

export function DashboardOverview() {
  return (
    <section className="mb-space-lg flex flex-col gap-space-md">
      <WelcomePanel
        eyebrow="Police HQ dispatch // logged in"
        unitId={STATION.unitId}
        title={`${greetingFor()}, Inspector.`}
        description={
          <>
            Here&apos;s what needs your attention today —{' '}
            <span className="font-medium text-on-surface">{STATION.name} Operational Shift</span>.
            All logs cryptographically signed.
          </>
        }
        actions={
          <>
            <Button variant="surface" size="lg" className="text-title-sm">
              <NotebookPen className="text-primary" />
              Quick FIR / Incident Log
            </Button>
            <Button variant="primary-container" size="lg" className="text-title-sm font-semibold">
              <RadioTower />
              Request Higher Assistance / Inform DSP
              <Badge tone="inverse" emphasis="strong">
                2 Priority
              </Badge>
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((stat) => (
          <MetricCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  )
}
