import {
  Activity,
  BadgeCheck,
  Bell,
  Building2,
  FileCheck,
  FileWarning,
  Files,
  Flame,
  Gavel,
  LayoutDashboard,
  Map,
  NotebookText,
  Radar,
  ScrollText,
  ShieldUser,
  SlidersHorizontal,
  Star,
  TriangleAlert,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { NavGroup } from '@/components/nyx'

export type LevelId = 2 | 3 | 4 | 5

export type LevelConfig = {
  level: LevelId
  role: string
  label: string
  title: string
  scopeKind: string
  icon: LucideIcon
  nav: NavGroup[]
}

export const LEVEL_IDS: LevelId[] = [2, 3, 4, 5]

export function levelPath(level: LevelId) {
  return `/level${level}/dashboard`
}

export function sectionPath(level: LevelId, section: string) {
  return `/level${level}/${section}`
}

function withPaths(level: LevelId, groups: NavGroup[]): NavGroup[] {
  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, to: sectionPath(level, item.id) })),
  }))
}

const RAW_LEVELS: Record<LevelId, LevelConfig> = {
  2: {
    level: 2,
    role: 'dgp',
    label: 'DGP',
    title: 'State Command',
    scopeKind: 'State scope',
    icon: Star,
    nav: [
      {
        id: 'command',
        label: 'State Command',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'overview', label: 'State Overview', icon: Map },
          { id: 'commissionerates', label: 'Commissionerates', icon: Building2 },
          { id: 'districts', label: 'Districts', icon: Files },
        ],
      },
      {
        id: 'oversight',
        label: 'Oversight',
        items: [
          { id: 'officers', label: 'Officers', icon: Users },
          { id: 'access', label: 'Access Requests', icon: FileCheck },
          { id: 'escalations', label: 'Escalations', icon: Gavel },
          { id: 'audit', label: 'Audit Log', icon: ScrollText },
        ],
      },
      {
        id: 'intel',
        label: 'Intelligence',
        items: [
          { id: 'incidents', label: 'Incidents', icon: Flame },
          { id: 'notebooks', label: 'Notebooks', icon: NotebookText },
          { id: 'search', label: 'Intelligence Search', icon: Radar },
          { id: 'reports', label: 'Reports', icon: Activity },
        ],
      },
      { id: 'system', label: 'System', items: [{ id: 'settings', label: 'Settings', icon: SlidersHorizontal }] },
    ],
  },
  3: {
    level: 3,
    role: 'cp',
    label: 'Commissioner',
    title: 'Commissionerate Command',
    scopeKind: 'District scope',
    icon: ShieldUser,
    nav: [
      {
        id: 'command',
        label: 'Commissionerate',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'overview', label: 'District Overview', icon: Map },
          { id: 'zones', label: 'Zones', icon: Building2 },
          { id: 'stations', label: 'Police Stations', icon: Files },
        ],
      },
      {
        id: 'oversight',
        label: 'Oversight',
        items: [
          { id: 'officers', label: 'DSP Officers', icon: Users },
          { id: 'access', label: 'Access Requests', icon: FileCheck },
          { id: 'sanctions', label: 'Sanctions', icon: Gavel },
          { id: 'audit', label: 'Audit Log', icon: ScrollText },
        ],
      },
      {
        id: 'intel',
        label: 'Intelligence',
        items: [
          { id: 'incidents', label: 'Incidents', icon: Flame },
          { id: 'notebooks', label: 'Notebooks', icon: NotebookText },
          { id: 'wanted', label: 'Most Wanted', icon: TriangleAlert },
          { id: 'reports', label: 'Reports', icon: Activity },
        ],
      },
      { id: 'system', label: 'System', items: [{ id: 'settings', label: 'Settings', icon: SlidersHorizontal }] },
    ],
  },
  4: {
    level: 4,
    role: 'dsp',
    label: 'DSP',
    title: 'Zone Command',
    scopeKind: 'Zone scope',
    icon: ShieldUser,
    nav: [
      {
        id: 'command',
        label: 'Zone Command',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'overview', label: 'Zone Overview', icon: Map },
          { id: 'stations', label: 'Police Stations', icon: Building2 },
          { id: 'inspectors', label: 'Inspectors', icon: BadgeCheck },
        ],
      },
      {
        id: 'casework',
        label: 'Casework',
        items: [
          { id: 'sanctions', label: 'Sanction Requests', icon: Gavel },
          { id: 'incidents', label: 'Incidents', icon: Flame },
          { id: 'notebooks', label: 'Notebooks', icon: NotebookText },
          { id: 'records', label: 'Zone Records', icon: Files },
        ],
      },
      {
        id: 'intel',
        label: 'Intelligence & Signals',
        items: [
          { id: 'wanted', label: 'Most Wanted', icon: TriangleAlert },
          { id: 'alerts', label: 'Alerts', icon: Bell },
          { id: 'search', label: 'Intelligence Search', icon: Radar },
        ],
      },
      { id: 'system', label: 'System', items: [{ id: 'settings', label: 'Settings', icon: SlidersHorizontal }] },
    ],
  },
  5: {
    level: 5,
    role: 'inspector',
    label: 'Inspector',
    title: 'Station Command',
    scopeKind: 'Station scope',
    icon: BadgeCheck,
    nav: [
      {
        id: 'station',
        label: 'Station',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'incidents', label: 'My Incidents', icon: FileWarning },
          { id: 'notebooks', label: 'My Notebooks', icon: NotebookText },
          { id: 'records', label: 'Station Records', icon: Files },
        ],
      },
      {
        id: 'intel',
        label: 'Intelligence',
        items: [
          { id: 'wanted', label: 'Most Wanted', icon: TriangleAlert },
          { id: 'search', label: 'Intelligence Search', icon: Radar },
        ],
      },
      {
        id: 'comms',
        label: 'Requests & Comms',
        items: [
          { id: 'requests', label: 'Requests', icon: FileCheck },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ],
      },
      { id: 'system', label: 'System', items: [{ id: 'settings', label: 'Settings', icon: SlidersHorizontal }] },
    ],
  },
}

export const LEVELS: Record<LevelId, LevelConfig> = Object.fromEntries(
  LEVEL_IDS.map((id) => [id, { ...RAW_LEVELS[id], nav: withPaths(id, RAW_LEVELS[id].nav) }])
) as Record<LevelId, LevelConfig>

export function sectionsFor(level: LevelId) {
  return LEVELS[level].nav.flatMap((group) =>
    group.items
      .filter((item) => item.id !== 'dashboard')
      .map((item) => ({ ...item, group: group.label ?? '' }))
  )
}

export function findSection(level: LevelId, section: string) {
  return LEVELS[level].nav
    .flatMap((group) => group.items.map((item) => ({ ...item, group: group.label ?? '' })))
    .find((item) => item.id === section)
}

export function levelForRole(role: string | null) {
  return LEVEL_IDS.find((id) => LEVELS[id].role === role)
}

export function dashboardPathForRole(role: string | null) {
  const level = levelForRole(role)
  return level ? levelPath(level) : '/login'
}

