import { LogOut } from 'lucide-react'
import { Avatar } from 'radix-ui'
import { Button } from '@/components/ui/button'

export type CurrentUser = { name: string; role: string; photoUrl?: string }

export function UserChip({ user, onSignOut }: { user: CurrentUser; onSignOut?: () => void }) {
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="flex items-center gap-space-sm">
      <div className="hidden text-right lg:block">
        <div className="text-title-sm text-on-surface">{user.name}</div>
        <div className="font-mono text-label-sm text-outline">{user.role}</div>
      </div>
      <Avatar.Root className="size-8 overflow-hidden rounded-full bg-surface-container-highest">
        <Avatar.Image src={user.photoUrl} alt={user.name} className="size-full object-cover" />
        <Avatar.Fallback className="flex size-full items-center justify-center font-mono text-label-md text-on-surface-variant">
          {initials}
        </Avatar.Fallback>
      </Avatar.Root>
      {onSignOut ? (
        <Button variant="ghost" size="icon-sm" aria-label="Sign out" onClick={onSignOut}>
          <LogOut />
        </Button>
      ) : null}
    </div>
  )
}
