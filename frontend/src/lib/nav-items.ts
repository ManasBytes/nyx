import {
  Bell,
  FileWarning,
  Files,
  LayoutDashboard,
  MailWarning,
  NotebookText,
  Radar,
  SlidersHorizontal,
  TriangleAlert,
} from 'lucide-react'
import type { NavGroup, NavItem } from '@/components/nyx'

const INSPECTOR_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { id: 'incidents', label: 'My Incidents', icon: FileWarning, to: '/incidents' },
  { id: 'notebooks', label: 'My Notebooks', icon: NotebookText, to: '/notebooks' },
  { id: 'records', label: 'Station Records', icon: Files, to: '/records' },
  { id: 'most-wanted', label: 'Most Wanted', icon: TriangleAlert, to: '/most-wanted' },
  { id: 'intelligence', label: 'Intelligence Search', icon: Radar, to: '/intelligence' },
  {
    id: 'requests',
    label: 'Requests & Comms',
    icon: MailWarning,
    to: '/requests',
    badge: 8,
    badgeTone: 'secondary',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    to: '/notifications',
    badge: 14,
    badgeTone: 'primary',
  },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal, to: '/settings' },
]

export const INSPECTOR_NAV: NavGroup[] = [
  { id: 'operational', label: 'Operational Navigation', items: INSPECTOR_ITEMS },
]
