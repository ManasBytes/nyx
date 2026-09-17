import { Badge } from '@/components/ui/badge'
import type { RecordCategory } from './types'

export function RecordCategoryCard({
  category,
  onOpen,
  onLogNew,
}: {
  category: RecordCategory
  onOpen?: (id: string) => void
  onLogNew?: (id: string) => void
}) {
  const { icon: Icon } = category

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(category.id)}
      onKeyDown={(event) => event.key === 'Enter' && onOpen?.(category.id)}
      className="flex cursor-pointer flex-col justify-between rounded bg-surface-container p-2.5 transition-colors hover:bg-surface-container-high"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-label-sm text-outline uppercase">{category.label}</span>
        <Badge tone={category.tone} className="text-telemetry-code font-bold">
          {category.count}
        </Badge>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Icon className="size-4 text-outline" />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onLogNew?.(category.id)
          }}
          className="font-mono text-label-sm font-semibold text-primary hover:underline"
        >
          + Log New
        </button>
      </div>
    </div>
  )
}
