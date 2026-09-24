import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AuthLayout, FormAlert } from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'

export function NoWorkspacePage() {
  const { signOut } = useAuth()

  return (
    <AuthLayout
      eyebrow="No Workspace"
      title="No dashboard for your level yet"
      subtitle="Your account is active, but its level has no workspace in this build."
      headline="Access is granted per level."
      blurb="Levels 2 to 5 have workspaces today. Level 1 administration is not part of this build."
      footer={
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <div className="flex flex-col gap-space-md">
        <FormAlert tone="error">
          Ask your sanctioning authority to confirm which level your account is assigned to.
        </FormAlert>
        <Button variant="surface" size="lg" className="w-full" onClick={signOut}>
          Sign out
        </Button>
      </div>
    </AuthLayout>
  )
}
