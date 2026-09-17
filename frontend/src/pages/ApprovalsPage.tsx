import { useEffect, useState } from 'react'
import { ConfirmAction } from '@/components/roles/ConfirmAction'
import { RequestRow } from '@/components/roles/RequestRow'
import { roleLabel } from '@/lib/role-display'
import {
  approveAccessRequest,
  listPendingApprovals,
  rejectAccessRequest,
  type AccessRequest,
} from '@/lib/roles'

export function ApprovalsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [error, setError] = useState('')

  function refresh() {
    listPendingApprovals()
      .then(setRequests)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load.'))
  }

  useEffect(refresh, [])

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-xl font-medium">Pending approvals</h1>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {requests.length === 0 && (
        <p className="text-sm text-muted-foreground">Nothing waiting on you.</p>
      )}
      {requests.map((request) => (
        <RequestRow key={request.id} request={request}>
          <ConfirmAction
            label="Approve"
            title={`Give ${roleLabel(request.requested_role)} access?`}
            description={`${request.user} will be granted ${roleLabel(request.requested_role)} access.`}
            onConfirm={() => approveAccessRequest(request.id).then(refresh)}
          />
          <ConfirmAction
            label="Reject"
            destructive
            title={`Reject ${roleLabel(request.requested_role)} request?`}
            description={`${request.user}'s request for ${roleLabel(request.requested_role)} will be rejected.`}
            onConfirm={() => rejectAccessRequest(request.id).then(refresh)}
          />
        </RequestRow>
      ))}
    </div>
  )
}
