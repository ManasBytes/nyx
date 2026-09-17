import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import type { AccessRequest } from '@/lib/roles'
import { roleLabel } from '@/lib/role-display'

const STATUS_VARIANT: Record<AccessRequest['status'], 'secondary' | 'default' | 'destructive'> = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
}

function jurisdictionLine(request: AccessRequest) {
  return [request.state, request.district, request.zone, request.city]
    .filter(Boolean)
    .join(' / ')
}

export function RequestRow({
  request,
  children,
}: {
  request: AccessRequest
  children?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-3 last:border-b-0">
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{roleLabel(request.requested_role)}</span>
          <Badge variant={STATUS_VARIANT[request.status]}>{request.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{jurisdictionLine(request)}</p>
        <p className="text-xs text-muted-foreground">
          {request.user} · approver: {request.approver_user ?? 'unassigned'}
        </p>
      </div>
      {children && <div className="flex shrink-0 gap-2">{children}</div>}
    </div>
  )
}
