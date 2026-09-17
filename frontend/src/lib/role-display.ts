import type { Role } from '@/lib/roles'

// Which jurisdiction fields below "state" a role's own request/assignment needs.
// Must mirror REQUIRED_JURISDICTION_FIELDS in backend/api/roles/services.py.
const JURISDICTION_DEPTH: Record<string, ('district' | 'zone' | 'city')[]> = {
  dgp: [],
  cp: ['district'],
  dsp: ['district', 'zone'],
  inspector: ['district', 'zone', 'city'],
}

export function jurisdictionFieldsFor(role: Role) {
  return JURISDICTION_DEPTH[role.name] ?? []
}

export function roleLabel(role: { name: string; level: number }) {
  return `Level ${role.level} — ${role.name.toUpperCase()}`
}

// Not self-requestable: superadmin is bootstrapped directly, and there's
// only one DGP per state, so it isn't handed out through open signup either.
const NOT_SELF_REQUESTABLE = ['superadmin', 'dgp']

export function requestableRoles(roles: Role[]) {
  return roles.filter((role) => !NOT_SELF_REQUESTABLE.includes(role.name))
}
