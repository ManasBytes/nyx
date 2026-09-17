import { PulseDot } from './pulse-dot'

export function SidebarStatus({ label, version }: { label: string; version: string }) {
  return (
    <div className="bg-surface-container-low/40 p-space-sm">
      <div className="flex items-center justify-between rounded bg-surface-container px-space-sm py-space-sm">
        <div className="flex items-center gap-2">
          <PulseDot tone="tertiary" />
          <span className="font-mono text-label-sm text-outline uppercase">{label}</span>
        </div>
        <span className="font-mono text-telemetry-code text-on-surface-variant">{version}</span>
      </div>
    </div>
  )
}
