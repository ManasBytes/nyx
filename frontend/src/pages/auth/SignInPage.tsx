import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthField, AuthLayout, DevLoginPanel, FormAlert } from '@/components/nyx'
import { useAuth } from '@/hooks/useAuth'
import { devLogin, getUserRole, login } from '@/lib/auth'
import { homeForRole, type DevLogin } from '@/lib/roles'

export function SignInPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleDevLogin(account: DevLogin) {
    setError('')
    setPending(true)
    try {
      const email = await devLogin(account.id)
      signIn(email)
      navigate(account.home)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dev sign in failed.')
    } finally {
      setPending(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email'))
    try {
      await login(email, String(form.get('password')))
      signIn(email)
      navigate(homeForRole(getUserRole()))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.')
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Secure Access"
      title="Sign in to your station"
      subtitle="Authenticate with your issued departmental credentials."
      headline="Investigation operations, under one command grid."
      blurb="Incidents, notebooks, evidence and zonal command in a single auditable workspace."
      footer={
        <>
          No account yet?{' '}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Request access
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <AuthField
          id="email"
          name="email"
          label="Official Email"
          type="email"
          autoComplete="email"
          placeholder="inspector@police.gov.in"
          required
        />
        <AuthField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          action={
            <Link
              to="/forgot-password"
              className="font-mono text-label-sm text-secondary hover:underline"
            >
              Forgot password?
            </Link>
          }
        />
        {error ? <FormAlert tone="error">{error}</FormAlert> : null}
        <Button
          type="submit"
          variant="primary-container"
          size="lg"
          className="w-full font-semibold"
          disabled={pending}
        >
          <LogIn />
          {pending ? 'Authenticating…' : 'Sign in'}
        </Button>
      </form>
      {import.meta.env.DEV ? <DevLoginPanel onSelect={handleDevLogin} disabled={pending} /> : null}
    </AuthLayout>
  )
}
