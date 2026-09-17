import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'
import type { EscalationRequest } from './types'

const statusToneClass = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  error: 'text-error',
  neutral: 'text-on-surface-variant',
  outline: 'text-outline',
}

export function EscalationRequestCard({
  request,
  onAction,
}: {
  request: EscalationRequest
  onAction?: (id: string) => void
}) {
  const { icon: StatusIcon } = request.status
  const codeClass = request.codeTone === 'secondary' ? 'text-secondary' : 'text-primary'

  return (
    <div className="flex flex-col gap-1 overflow-hidden rounded bg-surface-container p-space-sm transition-colors hover:bg-surface-container-high">
      <div className="flex items-center justify-between">
        <span className={cn('font-mono text-telemetry-code font-bold', codeClass)}>{request.code}</span>
        <Badge tone={request.codeTone === 'secondary' ? 'outline' : 'primary'}>{request.timeAgo}</Badge>
      </div>
      <div className="text-title-sm text-on-surface">{request.title}</div>
      <div className="-mx-space-sm -mb-space-sm mt-1 flex items-center justify-between bg-surface-container-lowest/30 px-space-sm py-1 font-mono text-label-sm">
        <span className={cn('flex items-center gap-1', statusToneClass[request.status.tone])}>
          <StatusIcon className="size-3.5" />
          {request.status.label}
        </span>
        <button
          type="button"
          onClick={() => onAction?.(request.id)}
          className="text-secondary hover:underline"
        >
          {request.action}
        </button>
      </div>
    </div>
  )
}
