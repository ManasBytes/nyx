import { cn } from 'cn'
import type { EntityFilter } from './types'

export function EntityChip({
  entity,
  onClick,
  className,
}: {
  entity: EntityFilter
  onClick?: (id: string) => void
  className?: string
}) {
  const { icon: Icon, label, iconClassName = 'text-primary' } = entity

  return (
    <button
      type="button"
      onClick={() => onClick?.(entity.id)}
      className={cn(
        'flex items-center gap-1 rounded bg-surface-container px-2 py-1 font-mono text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-highest',
        className
      )}
    >
      <Icon className={cn('size-3.5', iconClassName)} />
      <span>{label}</span>
    </button>
  )
}
