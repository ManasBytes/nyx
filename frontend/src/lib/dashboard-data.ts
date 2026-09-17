import {
  BadgeCheck,
  Building2,
  Car,
  Clock,
  CircleCheck,
  Crosshair,
  FileText,
  FileWarning,
  Fingerprint,
  FlaskConical,
  Images,
  Landmark,
  MapPin,
  Mic,
  Package,
  Paperclip,
  PenLine,
  ShieldUser,
  Smartphone,
  TriangleAlert,
  User,
  UserSearch,
  UserX,
  Video,
} from 'lucide-react'
import type {
  EntityFilter,
  EscalationRequest,
  EvidenceAsset,
  FilterTab,
  Incident,
  MetricStat,
  Notebook,
  RecordCategory,
  WantedPerson,
} from '@/components/nyx'

export const STATION = {
  name: 'Central Police Station',
  unitId: 'DL-CPS-01',
  officer: { name: 'V. Rathore', role: 'Inspector • Central PS' },
}

export const SYSTEM_STATUS = {
  level: 'DEFCON-3 // Active Surveillance',
  telemetry: 'CIPHER: AES-256-GCM • STATION GRID: DL-NORTH-CENTRAL-09 • DUTY DISPATCH: ACTIVE',
  cycle: 'Cycle: 06:00 - 18:00 HRS',
  latency: 'NODE LATENCY: 14ms',
}

export const METRICS: MetricStat[] = [
  {
    id: 'active-incidents',
    label: 'Active Incidents',
    value: 12,
    icon: FileWarning,
    highlight: { label: '4 Critical / Escalated', tone: 'error' },
    footnote: '3 pending forensics lead',
  },
  {
    id: 'pending-actions',
    label: 'Pending Actions',
    value: 4,
    icon: PenLine,
    iconClassName: 'text-primary-container',
    highlight: { label: 'Requires Inspector Signature', tone: 'primary' },
    footnote: '2 Remand Warrants pending',
  },
  {
    id: 'new-records',
    label: 'New Records Today',
    value: 8,
    icon: BadgeCheck,
    iconClassName: 'text-tertiary',
    highlight: { label: 'Logged • Shift 1', tone: 'tertiary' },
    footnote: '3 FIRs • 2 Seizures • 3 Plates',
  },
  {
    id: 'higher-auth',
    label: 'Higher Auth Requests',
    value: 2,
    icon: ShieldUser,
    iconClassName: 'text-secondary',
    highlight: { label: 'HQ Crime Branch', tone: 'secondary' },
    footnote: '1 Directive • 1 Sanction Pending',
  },
]

export const INCIDENT_TABS: FilterTab[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'high', label: 'High Priority', count: 3 },
  { id: 'investigating', label: 'Under Investigation', count: 7 },
  { id: 'forensics', label: 'Pending Forensics', count: 2 },
]

export const INCIDENTS: Incident[] = [
  {
    id: 'inc-0042',
    code: 'INC-2026-0042',
    title: 'Warehouse Armed Robbery & Safe Breach',
    date: '15 Sep 2026',
    updatedAt: '18 min ago',
    priority: { label: 'High Priority', tone: 'error' },
    status: { label: 'Investigating', tone: 'secondary' },
    accentClassName: 'bg-error',
    meta: [
      { icon: Images, label: '12 Assets', mono: true },
      { icon: Fingerprint, label: '2 Matches Found', iconClassName: 'text-tertiary' },
    ],
  },
  {
    id: 'inc-0038',
    code: 'INC-2026-0038',
    title: 'Inter-State Cargo Hijack & Gold Transit',
    date: '14 Sep 2026',
    updatedAt: '42 min ago',
    priority: { label: 'High Priority', tone: 'error' },
    status: { label: 'Active Pursuit', tone: 'primary' },
    accentClassName: 'bg-primary-container',
    meta: [
      { icon: Images, label: '19 Assets', mono: true },
      { icon: Crosshair, label: 'Corridor 4 Alert', iconClassName: 'text-secondary' },
    ],
  },
  {
    id: 'inc-0029',
    code: 'INC-2026-0029',
    title: 'Commercial Hub Cyber Extortion & Hawala Drop',
    date: '11 Sep 2026',
    updatedAt: '2 hrs ago',
    priority: { label: 'Medium', tone: 'neutral' },
    status: { label: 'Forensics Ingest', tone: 'tertiary' },
    accentClassName: 'bg-secondary',
    meta: [
      { icon: Images, label: '8 Assets', mono: true },
      { icon: Landmark, label: 'Subpoena Pending', iconClassName: 'text-primary' },
    ],
  },
  {
    id: 'inc-0015',
    code: 'INC-2026-0015',
    title: 'Luxury Vehicle Syndicate & FastTag Spoofing',
    date: '09 Sep 2026',
    updatedAt: '5 hrs ago',
    priority: { label: 'Normal', tone: 'outline' },
    status: { label: 'Case Diary Updated', tone: 'neutral' },
    accentClassName: 'bg-outline',
    meta: [
      { icon: Images, label: '14 Assets', mono: true },
      { icon: Car, label: '3 Plates Impounded' },
    ],
  },
]

export const NOTEBOOKS: Notebook[] = [
  {
    id: 'nb-042',
    code: 'NB-DEL-042',
    title: 'Warehouse Robbery Investigation',
    summary:
      'Detailed reconstruction of perimeter breach, cutter signature, and vehicle escape path via NH-44.',
    updatedAt: '12 min ago',
    stats: '14 pages • 23 assets',
    highlight: { label: '4 CCTV Syncs', tone: 'tertiary' },
    tag: { label: 'AI Correlation Ready', tone: 'primary' },
  },
  {
    id: 'nb-015',
    code: 'NB-DEL-015',
    title: 'Vehicle Theft Analysis & FastTag Trajectory',
    summary:
      'Correlation of 4 forged FASTags with toll plaza visual timestamps in Haryana-Delhi belt.',
    updatedAt: 'Yesterday',
    stats: '8 pages • 11 assets',
    highlight: { label: '2 Suspect Profiles', tone: 'secondary' },
    tag: { label: 'Toll Logs Attached', tone: 'neutral' },
  },
  {
    id: 'nb-029',
    code: 'NB-DEL-029',
    title: 'Financial Network & Courier Route',
    summary: 'Hawala drop money trails, shell merchant GST numbers, and linked cellular towers.',
    updatedAt: '3 days ago',
    stats: '17 pages • 31 assets',
    highlight: { label: 'Subpoena Records', tone: 'outline' },
    tag: { label: 'Bank Ledger Synced', tone: 'neutral' },
  },
]

export const RECORD_CATEGORIES: RecordCategory[] = [
  { id: 'incidents', label: 'Incidents', count: 142, icon: FileWarning, tone: 'primary' },
  { id: 'firs', label: 'FIR Records', count: 418, icon: FileText, tone: 'tertiary' },
  { id: 'persons', label: 'Persons of Int.', count: 320, icon: UserSearch, tone: 'secondary' },
  { id: 'vehicles', label: 'Vehicles', count: 194, icon: Car, tone: 'neutral' },
  { id: 'missing', label: 'Missing Pers.', count: 18, icon: UserX, tone: 'error' },
  { id: 'wanted', label: 'Wanted Persons', count: 14, icon: TriangleAlert, tone: 'error' },
  { id: 'seized', label: 'Seized Assets', count: 82, icon: Package, tone: 'neutral' },
  { id: 'evidence', label: 'Station Evid.', count: 96, icon: FlaskConical, tone: 'tertiary' },
]

export const ESCALATIONS: EscalationRequest[] = [
  {
    id: 'dsp-req-88',
    code: '#DSP-REQ-88',
    title: 'Warrant Clearance for Hawala Locker Search',
    timeAgo: '28 min ago',
    status: { label: 'Under Review by DSP Office', icon: Clock, tone: 'primary' },
    action: 'Track',
  },
  {
    id: 'dsp-dir-12',
    code: '#DSP-DIR-12',
    codeTone: 'secondary',
    title: 'Heighten Highway Patrolling on Corridor 4',
    timeAgo: '3 hrs ago',
    status: { label: 'Acknowledged • PCR Dispatched', icon: CircleCheck, tone: 'tertiary' },
    action: 'View SOP',
  },
]

export const WANTED_PEOPLE: WantedPerson[] = [
  {
    id: 'wnt-8902',
    name: "Tariq 'Chhota' Sheikh",
    code: 'WNT-DEL-8902',
    linkedIncidents: '3 Linked Incidents',
    lastSeen: 'G.T. Road Toll (Unconfirmed)',
    note: 'Armed & Dangerous',
    flag: { label: 'Red Flag', tone: 'error' },
  },
  {
    id: 'wnt-4419',
    name: 'Munna Qureshi',
    code: 'WNT-DEL-4419',
    linkedIncidents: '1 Linked Incident',
    lastSeen: 'Old Delhi Railway Yard',
    note: 'Non-Bailable Warrant',
    flag: { label: 'NBW Issued', tone: 'primary' },
  },
]

export const EVIDENCE_ASSETS: EvidenceAsset[] = [
  {
    id: 'asset-cctv',
    name: 'CCTV_Front_Gate_Night.mp4',
    incidentCode: 'INC-0042',
    note: 'Facial correlation ready',
    timeAgo: '5m ago',
    icon: Video,
    tone: 'secondary',
  },
  {
    id: 'asset-wire',
    name: 'Call_Recording_Wire_04.mp3',
    incidentCode: 'INC-0042',
    note: 'Transcript generated',
    timeAgo: '18m ago',
    icon: Mic,
    tone: 'tertiary',
  },
  {
    id: 'asset-cdr',
    name: 'CDR_September_Jasola.xlsx',
    incidentCode: 'INC-0038',
    note: 'Anomaly match: 14 hits',
    timeAgo: '31m ago',
    icon: FileText,
    tone: 'primary',
  },
  {
    id: 'asset-ballistics',
    name: 'Ballistics_Forensic_Report.pdf',
    incidentCode: 'INC-0042',
    note: 'Signed: FSL Rohini',
    timeAgo: '1h ago',
    icon: FileText,
    tone: 'error',
  },
]

export const ENTITY_FILTERS: EntityFilter[] = [
  { id: 'people', label: 'People', icon: User },
  { id: 'phones', label: 'Phone Numbers', icon: Smartphone, iconClassName: 'text-secondary' },
  { id: 'vehicles', label: 'Vehicles', icon: Car, iconClassName: 'text-tertiary' },
  { id: 'locations', label: 'Locations', icon: MapPin, iconClassName: 'text-outline' },
  { id: 'incidents', label: 'Incidents', icon: FileWarning },
  { id: 'assets', label: 'Assets', icon: Paperclip, iconClassName: 'text-secondary' },
  { id: 'orgs', label: 'Organizations', icon: Building2, iconClassName: 'text-tertiary' },
  { id: 'documents', label: 'Documents', icon: FileText, iconClassName: 'text-outline' },
]
