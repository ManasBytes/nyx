import type { ReactNode } from 'react'
import { Shield } from 'lucide-react'
import { APP_FULL_NAME } from '@/config/main.config'
import { HeaderActions } from './header-actions'
import { SearchField } from './search-field'
import { UserChip, type CurrentUser } from './user-chip'

const SEARCH_PLACEHOLDER = 'Search incidents, people, vehicles, phone numbers, assets...'

export function AppHeader({
  title,
  subtitle,
  pageLabel,
  user,
  actions,
  searchPlaceholder = SEARCH_PLACEHOLDER,
  onSignOut,
}: {
  title?: string
  subtitle?: string
  pageLabel?: string
  user: CurrentUser
  actions?: ReactNode
  searchPlaceholder?: string
  onSignOut?: () => void
}) {
  return (
    <header className="fixed top-0 right-0 left-sidebar z-40 flex h-topbar items-center justify-between bg-surface-container-lowest/90 px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-xl select-none">
      {title ? (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-space-xs">
            <span className="size-2 rounded-full bg-primary-container" />
            <span className="font-heading text-headline-md leading-none tracking-tight text-on-surface">
              {title}
            </span>
          </div>
          {subtitle ? (
            <span className="mt-0.5 font-mono text-telemetry-code text-outline">{subtitle}</span>
          ) : null}
        </div>
      ) : (
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <Shield className="size-5 text-primary-container" />
            <span className="font-mono text-label-lg font-bold tracking-wider text-on-surface uppercase">
              {APP_FULL_NAME}
            </span>
          </div>
          <div className="hidden h-4 w-px bg-surface-variant md:block" />
          <span className="hidden font-mono text-label-md tracking-wider text-outline uppercase md:block">
            {pageLabel}
          </span>
        </div>
      )}
      <div className="mx-space-lg max-w-xl flex-1">
        <SearchField
          placeholder={searchPlaceholder}
          trailing={
            <kbd className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-label-sm text-outline">
              Ctrl+K
            </kbd>
          }
        />
      </div>
      <div className="flex items-center gap-space-md">
        {actions ?? <HeaderActions />}
        <div className="h-6 w-px bg-surface-variant" />
        <UserChip user={user} onSignOut={onSignOut} />
      </div>
    </header>
  )
}
