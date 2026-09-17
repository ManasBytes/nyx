import {
  Activity,
  BadgeCheck,
  Bell,
  FileWarning,
  Files,
  FileCheck,
  Flame,
  LayoutDashboard,
  Building2,
  NotebookText,
  Radar,
  SlidersHorizontal,
  TriangleAlert,
  Waypoints,
} from 'lucide-react'
import type { NavGroup } from '@/components/nyx'

export const DSP_NAV: NavGroup[] = [
  {
    id: 'matrix',
    label: 'Operational Matrix',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dsp' },
      { id: 'my-incidents', label: 'My Incidents', icon: FileWarning, to: '/dsp/my-incidents' },
      { id: 'all-incidents', label: 'All Incidents', icon: Flame, to: '/dsp/incidents' },
      { id: 'notebooks', label: 'My Notebooks', icon: NotebookText, to: '/dsp/notebooks' },
      { id: 'records', label: 'Station Records', icon: Files, to: '/dsp/records' },
    ],
  },
  {
    id: 'zonal',
    label: 'Zonal Command',
    items: [
      { id: 'inspectors', label: 'Inspectors', icon: BadgeCheck, to: '/dsp/inspectors' },
      { id: 'stations', label: 'Police Stations', icon: Building2, to: '/dsp/stations' },
      {
        id: 'most-wanted',
        label: 'Most Wanted',
        icon: TriangleAlert,
        to: '/dsp/most-wanted',
        badge: 'ZONE-A',
        badgeTone: 'error',
      },
    ],
  },
  {
    id: 'intel',
    label: 'Intelligence & Signals',
    items: [
      { id: 'intelligence', label: 'Intelligence Search', icon: Radar, to: '/dsp/intelligence' },
      { id: 'network', label: 'Network Analysis', icon: Waypoints, to: '/dsp/network' },
      {
        id: 'requests',
        label: 'Requests',
        icon: FileCheck,
        to: '/dsp/requests',
        badge: 12,
        badgeTone: 'secondary',
      },
      { id: 'alerts', label: 'Alerts', icon: Bell, to: '/dsp/alerts', badge: 4, badgeTone: 'error' },
      { id: 'activity', label: 'Activity', icon: Activity, to: '/dsp/activity' },
      { id: 'reports', label: 'Reports', icon: Files, to: '/dsp/reports' },
      { id: 'settings', label: 'Settings', icon: SlidersHorizontal, to: '/dsp/settings' },
    ],
  },
]
