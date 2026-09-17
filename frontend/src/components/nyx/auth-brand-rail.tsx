import { Shield } from 'lucide-react'
import { APP_CODENAME, APP_VERSION } from '@/config/main.config'
import { PulseDot } from './pulse-dot'

export function AuthBrandRail({ headline, blurb }: { headline: string; blurb: string }) {
  return (
    <aside className="hidden flex-col justify-between bg-surface-container-lowest p-space-xl lg:flex">
      <div className="flex items-center gap-space-sm">
        <Shield className="size-7 shrink-0 text-primary-container" />
        <div className="flex flex-col">
          <span className="font-mono text-label-lg tracking-wider text-primary">{APP_CODENAME}</span>
          <span className="font-mono text-label-sm text-outline uppercase">
            Law Enforcement Operating System
          </span>
        </div>
      </div>
      <div className="flex max-w-md flex-col gap-space-sm">
        <h2 className="font-heading text-headline-xl tracking-tight text-on-surface">{headline}</h2>
        <p className="text-body-md text-on-surface-variant">{blurb}</p>
      </div>
      <div className="flex items-center justify-between rounded bg-surface-container px-space-md py-space-sm">
        <span className="flex items-center gap-space-xs">
          <PulseDot tone="tertiary" className="size-1.5" />
          <span className="font-mono text-telemetry-code text-on-surface">SEC-NET: SECURE</span>
        </span>
        <span className="font-mono text-label-sm text-outline">{APP_VERSION}</span>
      </div>
    </aside>
  )
}
