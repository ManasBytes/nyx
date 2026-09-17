import { BadgeCheck, ShieldUser, Star, type LucideIcon } from 'lucide-react'

export type Role = 'cp' | 'dsp' | 'inspector' | 'dgp' | 'superadmin'

export type JurisdictionField = 'district' | 'zone' | 'city'

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
    home: '/dsp',
    approver: 'DGP',
    fields: ['district'],
  },
  {
    id: 'dsp',
    label: 'DSP',
    icon: ShieldUser,
    home: '/dsp',
    approver: 'CP',
    fields: ['district', 'zone'],
  },
  {
    id: 'inspector',
    label: 'Inspector',
    icon: BadgeCheck,
    home: '/',
    approver: 'DSP',
    fields: ['district', 'zone', 'city'],
  },
]

export type DevLogin = { id: Role; label: string; email: string; home: string }

export const DEV_LOGINS: DevLogin[] = [
  {
    id: 'dgp',
    label: 'DGP',
    email: 'dgp@nyx.dev',
    home: '/dsp',
  },
  {
    id: 'superadmin',
    label: 'Superadmin',
    email: 'superadmin@nyx.dev',
    home: '/dsp',
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
