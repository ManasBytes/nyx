import { apiFetch } from '@/lib/api'

export type Role = {
  id: number
  name: string
  level: number
}

export type GeoOption = {
  id: number
  name: string
}

export type Assignment = {
  id: number
  role: Role
  state: string
  district: string | null
  zone: string | null
  city: string | null
  created_at: string
}

export type AccessRequest = {
  id: number
  user: string
  requested_role: Role
  state: string
  district: string | null
  zone: string | null
  city: string | null
  approver_user: string | null
  status: 'pending' | 'approved' | 'rejected'
  reason: string
  requested_at: string
  approved_at: string | null
}

export type JurisdictionInput = {
  requested_role: number
  state: number
  district?: number
  zone?: number
  city?: number
}

export const listRoles = (): Promise<Role[]> => apiFetch('/api/roles/roles/')
export const listStates = (): Promise<GeoOption[]> => apiFetch('/api/roles/states/')
export const listDistricts = (stateId: number): Promise<GeoOption[]> =>
  apiFetch(`/api/roles/districts/?state=${stateId}`)
export const listZones = (districtId: number): Promise<GeoOption[]> =>
  apiFetch(`/api/roles/zones/?district=${districtId}`)
export const listCities = (zoneId: number): Promise<GeoOption[]> =>
  apiFetch(`/api/roles/cities/?zone=${zoneId}`)

export const getMyAssignment = (): Promise<Assignment | null> =>
  apiFetch('/api/roles/my-assignment/')

export const listMyRequests = (): Promise<AccessRequest[]> =>
  apiFetch('/api/roles/access-requests/mine/')

export const listPendingApprovals = (): Promise<AccessRequest[]> =>
  apiFetch('/api/roles/access-requests/pending/')

export const submitAccessRequest = (data: JurisdictionInput): Promise<AccessRequest> =>
  apiFetch('/api/roles/access-requests/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const approveAccessRequest = (id: number): Promise<AccessRequest> =>
  apiFetch(`/api/roles/access-requests/${id}/approve/`, { method: 'POST' })

export const rejectAccessRequest = (id: number, reason = ''): Promise<AccessRequest> =>
  apiFetch(`/api/roles/access-requests/${id}/reject/`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  })
