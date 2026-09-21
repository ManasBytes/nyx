import type { Role } from '@/lib/roles'

const ACCESS_TOKEN_KEY = 'nyx_access_token'
const REFRESH_TOKEN_KEY = 'nyx_refresh_token'
const EMAIL_KEY = 'nyx_user_email'
const ROLE_KEY = 'nyx_user_role'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getUserEmail() {
  return localStorage.getItem(EMAIL_KEY)
}

export function getUserRole() {
  return localStorage.getItem(ROLE_KEY)
}

export function setUserRole(role: string) {
  localStorage.setItem(ROLE_KEY, role)
}

export function setSession(access: string, refresh: string, email: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, access)
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  localStorage.setItem(EMAIL_KEY, email)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(EMAIL_KEY)
  localStorage.removeItem(ROLE_KEY)
}

async function parseError(response: Response) {
  const body = await response.json().catch(() => null)
  const message = body && Object.values(body).flat().join(' ')
  return message || 'Something went wrong.'
}

export async function signup(data: {
  email: string
  password: string
  first_name: string
  last_name: string
  role: Role
  state: string
  district?: string
  zone?: string
  city?: string
}) {
  const roles = await fetch('/api/roles/roles/').then(async (response) => {
    if (!response.ok) throw new Error(await parseError(response))
    return response.json() as Promise<Array<{ id: number; name: string }>>
  })
  const requestedRole = roles.find((role) => role.name === data.role)
  if (!requestedRole) throw new Error('This role is not available.')

  const payload = { ...data, role: undefined }
  const response = await fetch('/api/auth/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, requested_role: requestedRole.id }),
  })
  if (!response.ok) throw new Error(await parseError(response))
}

export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) throw new Error(await parseError(response))
  const { access, refresh } = await response.json()
  setSession(access, refresh, email)
  await setAssignmentRole()
}

export async function devLogin(role: Role) {
  const response = await fetch('/api/auth/dev-login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  })
  if (!response.ok) throw new Error(await parseError(response))
  const { access, refresh, email } = await response.json()
  setSession(access, refresh, email)
  await setAssignmentRole()
  return email as string
}

export async function refreshSession() {
  const refresh = getRefreshToken()
  if (!refresh) return false

  const response = await fetch('/api/auth/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  if (!response.ok) return false
  const { access } = await response.json()
  localStorage.setItem(ACCESS_TOKEN_KEY, access)
  return true
}

async function setAssignmentRole() {
  const response = await fetch('/api/roles/my-assignment/', {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  })
  if (!response.ok) throw new Error(await parseError(response))
  const assignment = await response.json()
  if (!assignment?.role?.name) throw new Error('No active role assignment was found.')
  setUserRole(assignment.role.name)
}
