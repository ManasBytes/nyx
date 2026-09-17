import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GeoSelect } from '@/components/roles/GeoSelect'
import { RequestRow } from '@/components/roles/RequestRow'
import { useJurisdictionCascade } from '@/hooks/useJurisdictionCascade'
import { jurisdictionFieldsFor, requestableRoles } from '@/lib/role-display'
import {
  listMyRequests,
  listRoles,
  submitAccessRequest,
  type AccessRequest,
  type Role,
} from '@/lib/roles'
import { RoleSelect } from '@/components/roles/RoleSelect'

export function RequestAccessPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [roleId, setRoleId] = useState('')
  const [myRequests, setMyRequests] = useState<AccessRequest[]>([])
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const geo = useJurisdictionCascade()

  const role = roles.find((r) => String(r.id) === roleId)
  const needs = role ? jurisdictionFieldsFor(role) : []

  function refreshMyRequests() {
    listMyRequests().then(setMyRequests)
  }

  useEffect(() => {
    listRoles().then((all) => setRoles(requestableRoles(all)))
    refreshMyRequests()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      await submitAccessRequest({
        requested_role: Number(roleId),
        state: Number(geo.stateId),
        district: geo.districtId ? Number(geo.districtId) : undefined,
        zone: geo.zoneId ? Number(geo.zoneId) : undefined,
        city: geo.cityId ? Number(geo.cityId) : undefined,
      })
      setRoleId('')
      geo.reset()
      refreshMyRequests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      <Card>
        <CardHeader>
          <CardTitle>Request access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
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
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={pending || !roleId || !geo.stateId}>
              {pending ? 'Submitting…' : 'Submit request'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">Your requests</h2>
        {myRequests.length === 0 && (
          <p className="text-sm text-muted-foreground">No requests yet.</p>
        )}
        {myRequests.map((request) => (
          <RequestRow key={request.id} request={request} />
        ))}
      </div>
    </div>
  )
}
