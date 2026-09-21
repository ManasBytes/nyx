import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AuthField,
  AuthLayout,
  FormAlert,
  JurisdictionFields,
  RoleSelect,
} from '@/components/nyx'
import { useJurisdiction } from '@/hooks/useJurisdiction'
import { signup } from '@/lib/auth'
import { ROLES, roleOption, type Role } from '@/lib/roles'

export function SignUpPage() {
  const navigate = useNavigate()
  const jurisdiction = useJurisdiction()
  const [role, setRole] = useState<Role>('inspector')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const level = roleOption(role) ?? ROLES[2]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    const form = new FormData(event.currentTarget)
    try {
      await signup({
        email: String(form.get('email')),
        password: String(form.get('password')),
        first_name: String(form.get('first_name') ?? ''),
        last_name: String(form.get('last_name') ?? ''),
        role,
        ...jurisdiction.value,
      })
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Access request failed.')
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Access Request"
      title="Request NYX access"
      subtitle="Your request is routed to the sanctioning authority above your rank for approval."
      headline="Every entry signed. Every action accountable."
      blurb="Case diaries, evidence chains and sanction trails carry a tamper-evident audit log."
      footer={
        <>
          Already enrolled?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <AuthField id="first_name" name="first_name" label="First Name" autoComplete="given-name" />
          <AuthField id="last_name" name="last_name" label="Last Name" autoComplete="family-name" />
        </div>
        <AuthField
          id="email"
          name="email"
          label="Official Email"
          type="email"
          autoComplete="email"
          placeholder="officer@police.gov.in"
          required
        />
        <RoleSelect value={role} onValueChange={setRole} />
        <div className="flex items-center gap-space-xs">
          <span className="font-mono text-label-sm text-outline uppercase">Approval routed to</span>
          <Badge tone="secondary" emphasis="strong">
            {level.approver}
          </Badge>
        </div>
        <JurisdictionFields fields={level.fields} jurisdiction={jurisdiction} />
        <AuthField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
          minLength={8}
          required
        />
        {error || jurisdiction.error ? <FormAlert tone="error">{error || jurisdiction.error}</FormAlert> : null}
        <Button
          type="submit"
          variant="primary-container"
          size="lg"
          className="w-full font-semibold"
          disabled={pending || jurisdiction.isLoading}
        >
          <UserPlus />
          {pending ? 'Submitting request…' : 'Request access'}
        </Button>
      </form>
    </AuthLayout>
  )
}
