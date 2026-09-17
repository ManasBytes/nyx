import { BookOpen, SquarePen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Notebook } from './types'

export function NotebookCard({
  notebook,
  variant = 'card',
  onOpen,
}: {
  notebook: Notebook
  variant?: 'card' | 'row'
  onOpen?: (id: string) => void
}) {
  if (variant === 'row') return <NotebookRow notebook={notebook} onOpen={onOpen} />

  return (
    <button
      type="button"
      onClick={() => onOpen?.(notebook.id)}
      className="group flex flex-col justify-between overflow-hidden rounded bg-surface-container p-space-md text-left shadow-sm transition-all hover:bg-surface-container-high"
    >
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-label-sm text-primary">{notebook.code}</span>
          <span className="font-mono text-label-sm text-outline">{notebook.updatedAt}</span>
        </div>
        <h4 className="line-clamp-1 text-title-sm text-on-surface transition-colors group-hover:text-primary">
          {notebook.title}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-body-sm text-on-surface-variant">{notebook.summary}</p>
      </div>
      <div className="-mx-space-md -mb-space-md mt-4 flex w-[calc(100%+var(--spacing-space-md)*2)] flex-col gap-1.5 bg-surface-container-lowest/40 p-space-sm">
        <div className="flex items-center justify-between font-mono text-label-sm text-outline">
          <span>{notebook.stats}</span>
          <span className={notebook.highlight.tone === 'tertiary' ? 'text-tertiary' : 'text-secondary'}>
            {notebook.highlight.label}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Badge tone={notebook.tag.tone}>{notebook.tag.label}</Badge>
          <SquarePen className="size-4 text-outline transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  )
}

function NotebookRow({
  notebook,
  onOpen,
}: {
  notebook: Notebook
  onOpen?: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(notebook.id)}
      className="flex items-start gap-space-sm rounded-lg bg-surface-container p-space-md text-left transition-colors hover:bg-surface-container-high"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded bg-surface-container-lowest">
        <BookOpen className="size-5 text-secondary" />
      </div>
      <div className="min-w-0 flex-1">
        <h5 className="truncate text-title-sm text-on-surface">{notebook.title}</h5>
        <div className="mt-0.5 flex items-center gap-2 font-mono text-telemetry-code text-outline">
          <span>{notebook.stats}</span>
          <span>•</span>
          <span className="text-tertiary">{notebook.highlight.label}</span>
        </div>
        <p className="mt-1 truncate text-body-sm text-on-surface-variant">{notebook.summary}</p>
      </div>
    </button>
  )
}
