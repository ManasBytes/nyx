import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { APP_NAME } from '@/config/main.config'

export function HomePage() {
  const { email, signOut } = useAuth()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-medium">Welcome to {APP_NAME}</h1>
      <p className="text-muted-foreground">Signed in as {email}</p>
      <Button variant="outline" onClick={signOut}>
        Log out
      </Button>
    </div>
  )
}
