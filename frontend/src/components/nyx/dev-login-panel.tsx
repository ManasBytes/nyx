import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DEV_LOGINS, type DevLogin } from '@/lib/roles'

export function DevLoginPanel({
  onSelect,
  disabled,
}: {
  onSelect: (login: DevLogin) => void
  disabled?: boolean
}) {
  return (
    <div className="mt-space-lg flex flex-col gap-space-sm rounded bg-surface-container-lowest p-space-md">
      <div className="flex items-center gap-space-xs">
        <Zap className="size-3.5 text-primary-container" />
        <span className="font-mono text-label-sm tracking-wider text-outline uppercase">
          Dev sign in
        </span>
      </div>
      <div className="grid grid-cols-2 gap-space-sm">
        {DEV_LOGINS.map((login) => (
          <Button
            key={login.id}
            type="button"
            variant="surface"
            className="text-title-sm"
            onClick={() => onSelect(login)}
            disabled={disabled}
          >
            {login.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
