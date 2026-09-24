import { BadgeCheck, ShieldUser, Star, type LucideIcon } from 'lucide-react'

export type Role = 'cp' | 'dsp' | 'inspector' | 'dgp' | 'superadmin'

export type JurisdictionField = 'state' | 'district' | 'zone' | 'city'

export type RoleOption = {
  id: Role
  label: string
  icon: LucideIcon
  home: string
  approver: string
  fields: JurisdictionField[]
}

export const ROLES: RoleOption[] = [
  {
    id: 'cp',
    label: 'CP',
    icon: Star,
    home: '/level3/dashboard',
    approver: 'DGP',
    fields: ['state', 'district'],
  },
  {
    id: 'dsp',
    label: 'DSP',
    icon: ShieldUser,
    home: '/level4/dashboard',
    approver: 'CP',
    fields: ['state', 'district', 'zone'],
  },
  {
    id: 'inspector',
    label: 'Inspector',
    icon: BadgeCheck,
    home: '/level5/dashboard',
    approver: 'DSP',
    fields: ['state', 'district', 'zone', 'city'],
  },
]

export type DevLogin = { id: Role; label: string; email: string; home: string }

export const DEV_LOGINS: DevLogin[] = [
  {
    id: 'dgp',
    label: 'DGP',
    email: 'dgp@nyx.dev',
    home: '/level2/dashboard',
  },
  {
    id: 'superadmin',
    label: 'Superadmin',
    email: 'superadmin@nyx.dev',
    home: '/',
  },
]

export function roleOption(role: string | null) {
  return ROLES.find((option) => option.id === role)
}

export function homeForRole(role: string | null) {
  return (
    roleOption(role)?.home ?? DEV_LOGINS.find((login) => login.id === role)?.home ?? '/'
  )
}
