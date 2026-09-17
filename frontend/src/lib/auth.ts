import type { Role } from '@/lib/roles'

const ACCESS_TOKEN_KEY = 'nyx_access_token'
const REFRESH_TOKEN_KEY = 'nyx_refresh_token'
const EMAIL_KEY = 'nyx_user_email'
const ROLE_KEY = 'nyx_user_role'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
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
  district?: string
  zone?: string
  city?: string
}) {
  const response = await fetch('/api/auth/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(await parseError(response))
  setUserRole(data.role)
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
}
