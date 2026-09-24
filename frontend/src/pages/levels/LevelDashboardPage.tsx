import { Badge } from '@/components/ui/badge'
import { ModuleCard, PanelHeader, SectionCard, WelcomePanel } from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'
import { getUserScope } from '@/lib/auth'
import { greetingFor } from '@/lib/greeting'
import { LEVELS, sectionsFor, type LevelId } from '@/lib/levels'
import { LevelShell } from './LevelShell'

export function LevelDashboardPage({ level }: { level: LevelId }) {
  const { email } = useAuth()
  const config = LEVELS[level]
  const modules = sectionsFor(level)
  const scope = getUserScope()
  const name = email?.split('@')[0] ?? config.label

  return (
    <LevelShell level={level} title={`${config.label} Dashboard`}>
      <WelcomePanel
        icon={config.icon}
        title={`${greetingFor()}, ${config.label}.`}
        titleBadges={
          <>
            <Badge tone="primary" emphasis="strong">
              Level {config.level}
            </Badge>
            <span className="font-mono text-telemetry-code text-outline uppercase">
              {config.title}
            </span>
          </>
        }
        description={
          <>
            Signed in as <span className="font-medium text-on-surface">{name}</span> —{' '}
            {scope ? `${config.scopeKind.toLowerCase()}: ${scope}.` : `${config.scopeKind.toLowerCase()}.`}{' '}
            Your workspace modules are listed below.
          </>
        }
      />
      <SectionCard className="mt-space-lg rounded-xl shadow-md">
        <PanelHeader
          title="Workspace Modules"
          badge={<Badge tone="neutral">{modules.length} modules</Badge>}
          action={
            <span className="font-mono text-telemetry-code text-outline">
              LEVEL {config.level} ACCESS
            </span>
          }
        />
        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              icon={module.icon}
              label={module.label}
              group={module.group}
              to={module.to}
            />
          ))}
        </div>
      </SectionCard>
    </LevelShell>
  )
}
