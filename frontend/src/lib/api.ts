import { getAccessToken } from '@/lib/auth'

async function parseError(response: Response) {
  const body = await response.json().catch(() => null)
  const message = body && Object.values(body).flat().join(' ')
  return message || 'Something went wrong.'
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getAccessToken()
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!response.ok) throw new Error(await parseError(response))
  if (response.status === 204) return null
  return response.json()
}
