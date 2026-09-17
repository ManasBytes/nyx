import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export type Tone = 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'outline'

export type Tag = { label: string; tone?: Tone; strong?: boolean }

export type NavItem = {
  id: string
  label: string
  icon: LucideIcon
  to?: string
  badge?: string | number
  badgeTone?: Tone
}

export type NavGroup = { id: string; label?: string; items: NavItem[] }

export type MetricStat = {
  id: string
  label: string
  value: string | number
  icon: LucideIcon
  iconClassName?: string
  valueClassName?: string
  highlight: Tag
  footnote: string
}

export type IncidentMeta = { icon: LucideIcon; label: string; iconClassName?: string; mono?: boolean }

export type Incident = {
  id: string
  code: string
  title: string
  date: string
  updatedAt: string
  priority: Tag
  status: Tag
  accentClassName: string
  meta: IncidentMeta[]
}

export type Notebook = {
  id: string
  code: string
  title: string
  summary: string
  updatedAt: string
  stats: string
  highlight: Tag
  tag: Tag
}

export type RecordCategory = {
  id: string
  label: string
  count: number
  icon: LucideIcon
  tone: Tone
}

export type EscalationRequest = {
  id: string
  code: string
  title: string
  timeAgo: string
  status: { label: string; icon: LucideIcon; tone: Tone }
  action: string
  codeTone?: Tone
}

export type WantedPerson = {
  id: string
  name: string
  code: string
  linkedIncidents: string
  lastSeen: string
  note?: string
  flag?: Tag
  reward?: string
  tier?: string
  chips?: Tag[]
  photoUrl?: string
}

export type EvidenceAsset = {
  id: string
  name: string
  incidentCode?: string
  note: string
  timeAgo?: string
  status?: Tag
  icon: LucideIcon
  tone: Tone
}

export type EntityFilter = { id: string; label: string; icon: LucideIcon; iconClassName?: string }

export type FilterTab = { id: string; label: string; count?: number }

export type Station = {
  id: string
  code: string
  name: string
  sho: string
  lastActive: string
  tag: Tag
  counters: { label: string; value: number; tone?: Tone }[]
}

export type CaseMeta = { icon: LucideIcon; label: string; iconClassName?: string }

export type FlaggedCase = {
  id: string
  code: string
  title: string
  origin: string
  trigger: string
  meta: CaseMeta[]
  secondaryAction: string
  primaryAction: string
  primaryTone?: 'primary' | 'error'
}

export type DirectCase = {
  id: string
  code: string
  title: string
  summary: string
  classification: string
  stats: string[]
  action: string
}

export type SanctionRequest = {
  id: string
  code: string
  kind: Tag
  officer: string
  station: string
  detail: string
  primaryAction: string
  secondaryAction: string
  rejectAction?: string
}

export type ThreatAlert = {
  id: string
  kind: Tag
  timeAgo: string
  body: ReactNode
  footnote: string
  action: string
}

export type UplinkAction = {
  id: string
  label: string
  icon: LucideIcon
  iconClassName?: string
}
