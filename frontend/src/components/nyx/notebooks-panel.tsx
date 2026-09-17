import type { ReactNode } from 'react'
import { FilePlus, Lock, NotebookText } from 'lucide-react'
import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NotebookCard } from './notebook-card'
import { SectionCard, SectionHeader } from './section-card'
import type { Notebook } from './types'

export function NotebooksPanel({
  notebooks,
  header,
  variant = 'card',
  columns = 'md:grid-cols-3',
  onOpenNotebook,
  onCreate,
}: {
  notebooks: Notebook[]
  header?: ReactNode
  variant?: 'card' | 'row'
  columns?: string
  onOpenNotebook?: (id: string) => void
  onCreate?: () => void
}) {
  return (
    <SectionCard>
      {header ?? (
      <SectionHeader
        icon={NotebookText}
        iconClassName="text-secondary"
        title="My Investigation Notebooks"
        subtitle="Structured evidence narratives • Disclosure compliant"
        badge={<Badge tone="secondary">Tiptap Engine</Badge>}
        action={
          <>
            <span className="hidden items-center gap-1 rounded bg-tertiary-container/10 px-2 py-1 font-mono text-label-sm text-tertiary md:flex">
              <Lock className="size-3.5" />
              Indelible Audit &amp; Cryptographic Log Active
            </span>
            <Button variant="surface" size="lg" className="text-title-sm" onClick={onCreate}>
              <FilePlus />
              New Notebook
            </Button>
          </>
        }
      />
      )}
      <div className={cn('grid grid-cols-1 gap-space-md', columns)}>
        {notebooks.map((notebook) => (
          <NotebookCard
            key={notebook.id}
            notebook={notebook}
            variant={variant}
            onOpen={onOpenNotebook}
          />
        ))}
      </div>
    </SectionCard>
  )
}
