import { PulseDot } from './pulse-dot'

export function SystemStatusBar({
  level,
  telemetry,
  cycle,
  latency,
}: {
  level: string
  telemetry: string
  cycle: string
  latency: string
}) {
  return (
    <div className="mb-space-md flex w-full items-center justify-between rounded bg-surface-container-lowest px-space-md py-1.5 shadow-sm">
      <div className="flex min-w-0 items-center gap-space-md">
        <div className="flex shrink-0 items-center gap-1.5">
          <PulseDot tone="primary" />
          <span className="font-mono text-label-sm font-bold tracking-wider text-primary uppercase">
            {level}
          </span>
        </div>
        <span className="font-mono text-label-sm text-surface-variant">|</span>
        <span className="truncate font-mono text-telemetry-code text-on-surface-variant">
          {telemetry}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-space-sm">
        <span className="hidden font-mono text-label-sm text-outline uppercase sm:inline">{cycle}</span>
        <span className="rounded bg-tertiary-container/10 px-2 py-0.5 font-mono text-telemetry-code font-semibold text-tertiary">
          {latency}
        </span>
      </div>
    </div>
  )
}
