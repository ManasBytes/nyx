import { cn } from 'cn'
import type { FilterTab } from './types'

export function FilterTabs({
  tabs,
  value,
  onValueChange,
  className,
}: {
  tabs: FilterTab[]
  value: string
  onValueChange: (id: string) => void
  className?: string
}) {
  return (
    <div className={cn('mb-space-sm flex items-center gap-1 overflow-x-auto pb-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-pressed={tab.id === value}
          onClick={() => onValueChange(tab.id)}
          className={cn(
            'shrink-0 rounded px-2.5 py-1 font-mono text-label-md transition-colors',
            tab.id === value
              ? 'bg-surface-container-highest font-semibold text-primary'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          )}
        >
          {tab.label}
          {tab.count === undefined ? '' : ` (${tab.count})`}
        </button>
      ))}
    </div>
  )
}
