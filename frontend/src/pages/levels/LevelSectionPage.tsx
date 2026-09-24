import { Link, useParams } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/nyx'
import { LEVELS, findSection, levelPath, type LevelId } from '@/lib/levels'
import { LevelShell } from './LevelShell'

export function LevelSectionPage({ level }: { level: LevelId }) {
  const { section = '' } = useParams()
  const item = findSection(level, section)
  const config = LEVELS[level]

  if (!item) {
    return (
      <LevelShell level={level} title="Page not found">
        <EmptyState
          icon={FileQuestion}
          eyebrow="404"
          title="This page does not exist"
          description={`There is no "${section}" section in the Level ${level} workspace.`}
          action={
            <Button variant="primary-container" size="lg" asChild>
              <Link to={levelPath(level)}>Back to dashboard</Link>
            </Button>
          }
        />
      </LevelShell>
    )
  }

  return (
    <LevelShell level={level} title={item.label}>
      <EmptyState
        icon={item.icon}
        eyebrow={`${item.group} • Level ${level}`}
        title={item.label}
        description={`${item.label} for ${config.title} is scoped and routed, but the module itself is not built yet.`}
        action={
          <Button variant="surface" size="lg" asChild>
            <Link to={levelPath(level)}>Back to dashboard</Link>
          </Button>
        }
      />
    </LevelShell>
  )
}
