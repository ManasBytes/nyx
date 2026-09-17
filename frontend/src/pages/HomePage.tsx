import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { APP_NAME } from '@/config/main.config'
import { roleLabel } from '@/lib/role-display'
import { getMyAssignment, listPendingApprovals, type Assignment } from '@/lib/roles'

export function HomePage() {
  const { email, signOut } = useAuth()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    getMyAssignment().then(setAssignment)
    listPendingApprovals().then((requests) => setPendingCount(requests.length))
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-medium">Welcome to {APP_NAME}</h1>
      <p className="text-muted-foreground">Signed in as {email}</p>
      <p>
        {assignment
          ? `You are: ${roleLabel(assignment.role)}`
          : "You don't have a role yet."}
      </p>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link to="/request-access">Request access</Link>
        </Button>
        {pendingCount > 0 && (
          <Button asChild variant="outline">
            <Link to="/approvals">Pending approvals ({pendingCount})</Link>
          </Button>
        )}
      </div>
      <Button variant="outline" onClick={signOut}>
        Log out
      </Button>
    </div>
  )
}
