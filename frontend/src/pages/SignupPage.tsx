import { type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GeoSelect } from '@/components/roles/GeoSelect'
import { RoleSelect } from '@/components/roles/RoleSelect'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useJurisdictionCascade } from '@/hooks/useJurisdictionCascade'
import { signup } from '@/lib/auth'
import { jurisdictionFieldsFor, requestableRoles } from '@/lib/role-display'
import { listRoles, type Role } from '@/lib/roles'

export function SignupPage() {
  const navigate = useNavigate()
  const [roles, setRoles] = useState<Role[]>([])
  const [roleId, setRoleId] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const geo = useJurisdictionCascade()

  const role = roles.find((r) => String(r.id) === roleId)
  const needs = role ? jurisdictionFieldsFor(role) : []

  useEffect(() => {
    listRoles().then((all) => setRoles(requestableRoles(all)))
  }, [])

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
        requested_role: Number(roleId),
        state: Number(geo.stateId),
        district: geo.districtId ? Number(geo.districtId) : undefined,
        zone: geo.zoneId ? Number(geo.zoneId) : undefined,
        city: geo.cityId ? Number(geo.cityId) : undefined,
      })
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your nyx account</CardTitle>
          <CardDescription>
            Pick the role and area you're requesting access for - your senior will need
            to approve it before you can use it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First name</Label>
                <Input id="first_name" name="first_name" autoComplete="given-name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last name</Label>
                <Input id="last_name" name="last_name" autoComplete="family-name" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <RoleSelect roles={roles} value={roleId} onChange={setRoleId} />
            {role && (
              <GeoSelect
                label="State"
                placeholder="Select a state"
                options={geo.states}
                value={geo.stateId}
                onChange={geo.setStateId}
              />
            )}
            {needs.includes('district') && geo.stateId && (
              <GeoSelect
                label="District"
                placeholder="Select a district"
                options={geo.districts}
                value={geo.districtId}
                onChange={geo.setDistrictId}
              />
            )}
            {needs.includes('zone') && geo.districtId && (
              <GeoSelect
                label="Zone"
                placeholder="Select a zone"
                options={geo.zones}
                value={geo.zoneId}
                onChange={geo.setZoneId}
              />
            )}
            {needs.includes('city') && geo.zoneId && (
              <GeoSelect
                label="City"
                placeholder="Select a city"
                options={geo.cities}
                value={geo.cityId}
                onChange={geo.setCityId}
              />
            )}

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={pending || !roleId || !geo.stateId}
            >
              {pending ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
