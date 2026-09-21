export type Location = { id: number; name: string }

export async function getLocations(path: string, parent?: string) {
  const query = parent ? `?${path === 'districts' ? 'state' : path === 'zones' ? 'district' : 'zone'}=${parent}` : ''
  const response = await fetch(`/api/roles/${path}/${query}`)
  if (!response.ok) throw new Error('Could not load jurisdiction options.')
  return response.json() as Promise<Location[]>
}
