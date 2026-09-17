import { ChevronRight } from 'lucide-react'
import { cn } from 'cn'
import type { UplinkAction } from './types'

export function ActionListButton({
  action,
  onSelect,
}: {
  action: UplinkAction
  onSelect?: (id: string) => void
}) {
  const { icon: Icon, iconClassName = 'text-primary-container' } = action

  return (
    <button
      type="button"
      onClick={() => onSelect?.(action.id)}
      className="flex w-full items-center justify-between gap-space-sm rounded bg-surface-container p-space-sm text-on-surface transition-colors hover:bg-surface-container-high"
    >
      <span className="flex items-center gap-space-sm text-left">
        <Icon className={cn('size-5 shrink-0', iconClassName)} />
        <span className="font-mono text-label-sm font-semibold uppercase">{action.label}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-outline" />
    </button>
  )
}
