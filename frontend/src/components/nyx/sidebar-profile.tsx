import { LogOut, ShieldUser, type LucideIcon } from 'lucide-react'

export function SidebarProfile({
  name,
  role,
  meta,
  metaIcon: MetaIcon,
  onSignOut,
}: {
  name: string
  role: string
  meta: string
  metaIcon: LucideIcon
  onSignOut?: () => void
}) {
  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md">
      <div className="flex items-center gap-space-sm">
        <div className="flex size-9 shrink-0 items-center justify-center rounded bg-surface-container-high">
          <ShieldUser className="size-5 text-primary" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-title-sm text-on-surface">{name}</span>
          <span className="truncate font-mono text-telemetry-code text-on-surface-variant">{role}</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded bg-surface-container-low p-space-xs">
        <span className="flex items-center gap-1 font-mono text-label-sm text-outline">
          <MetaIcon className="size-3.5 text-tertiary" />
          {meta}
        </span>
        <button
          type="button"
          onClick={onSignOut}
          className="flex items-center gap-0.5 font-mono text-label-sm text-error uppercase transition-colors hover:text-on-surface"
        >
          <LogOut className="size-3.5" />
          Exit
        </button>
      </div>
    </div>
  )
}
