import {
  AudioLines,
  BadgeCheck,
  Building2,
  CircleAlert,
  FileText,
  Forward,
  Landmark,
  MapPin,
  Siren,
  TriangleAlert,
  User,
  Video,
  Waypoints,
} from 'lucide-react'
import type {
  DirectCase,
  EvidenceAsset,
  FlaggedCase,
  MetricStat,
  Notebook,
  SanctionRequest,
  Station,
  ThreatAlert,
  UplinkAction,
  WantedPerson,
} from '@/components/nyx'

export const DSP = {
  zone: 'DSP Zone — Chennai Central',
  officer: { name: 'DSP K. Ramanathan, IPS', role: 'DSP Zone — Chennai Central' },
  headerUser: { name: 'RAMANATHAN.K', role: 'IPS // AUTH-DSP' },
  stationsSynced: '8 Stations Synced',
}

export const DSP_METRICS: MetricStat[] = [
  {
    id: 'active-incidents',
    label: 'Active Incidents',
    value: 42,
    icon: Siren,
    iconClassName: 'text-secondary',
    highlight: { label: '+5 this wk', tone: 'tertiary' },
    footnote: '8 Stations reporting',
  },
  {
    id: 'inspectors',
    label: 'Inspectors',
    value: '8/8',
    icon: BadgeCheck,
    iconClassName: 'text-tertiary',
    valueClassName: 'text-tertiary',
    highlight: { label: '100%', tone: 'tertiary' },
    footnote: 'All on active duty shift',
  },
  {
    id: 'stations',
    label: 'Stations Bound',
    value: 8,
    icon: Building2,
    iconClassName: 'text-secondary',
    highlight: { label: 'Secured', tone: 'secondary' },
    footnote: 'Central, Harbor, Egmore...',
  },
  {
    id: 'sanctions',
    label: 'Pending Sanctions',
    value: 12,
    icon: CircleAlert,
    iconClassName: 'text-primary-container',
    valueClassName: 'text-primary',
    highlight: { label: 'Requires Sign', tone: 'primary' },
    footnote: 'CDR, Sec 91, Remand',
  },
  {
    id: 'critical',
    label: 'Critical Alerts',
    value: 4,
    icon: TriangleAlert,
    iconClassName: 'text-error',
    valueClassName: 'text-error',
    highlight: { label: '2 Escalate', tone: 'error' },
    footnote: '1 Cross-border match',
  },
  {
    id: 'review',
    label: 'DSP Case Review',
    value: 7,
    icon: FileText,
    iconClassName: 'text-tertiary',
    highlight: { label: 'Flagged', tone: 'tertiary' },
    footnote: 'AI Lead correlation stall',
  },
]

export const STATIONS: Station[] = [
  {
    id: 'central',
    code: 'C1',
    name: 'Central Police Station (B1)',
    sho: 'Insp. Raj Kumar',
    lastActive: '10m ago',
    tag: { label: 'DUTY SHIFT', tone: 'tertiary' },
    counters: [
      { label: 'Active', value: 12 },
      { label: 'Reqs', value: 3, tone: 'primary' },
      { label: 'Alert', value: 1, tone: 'error' },
    ],
  },
  {
    id: 'harbor',
    code: 'H2',
    name: 'Harbor Police Station (B2)',
    sho: 'Insp. M. Selvam',
    lastActive: '24m ago',
    tag: { label: 'HAWALA CORRIDOR', tone: 'error' },
    counters: [
      { label: 'Active', value: 8 },
      { label: 'Reqs', value: 2, tone: 'primary' },
      { label: 'Alerts', value: 2, tone: 'error' },
    ],
  },
  {
    id: 'triplicane',
    code: 'T3',
    name: 'Triplicane Police Station (D1)',
    sho: 'Insp. K. Anbarasan',
    lastActive: '45m ago',
    tag: { label: 'NOMINAL', tone: 'tertiary' },
    counters: [
      { label: 'Active', value: 9 },
      { label: 'Reqs', value: 4, tone: 'primary' },
      { label: 'Alert', value: 0, tone: 'outline' },
    ],
  },
  {
    id: 'egmore',
    code: 'E4',
    name: 'Egmore Police Station (F1)',
    sho: 'Insp. V. Swaminathan',
    lastActive: '1h ago',
    tag: { label: 'UNDERCOVER OP', tone: 'primary' },
    counters: [
      { label: 'Active', value: 6 },
      { label: 'Req', value: 1, tone: 'primary' },
      { label: 'Alert', value: 1, tone: 'error' },
    ],
  },
]

export const FLAGGED_CASES: FlaggedCase[] = [
  {
    id: 'inc-00421',
    code: 'INC-2026-00421',
    title: 'Warehouse Cargo Theft & Hawala Conduit',
    origin: 'Central Station // Insp. Raj Kumar',
    trigger:
      'AI Correlation engine verified 3 phone numbers linking suspect consignments with a Bangalore Cyber Syndicate account. Inspector requests approval to issue cross-state Section 91 summon.',
    meta: [
      { icon: Waypoints, label: '12 Assets' },
      { icon: User, label: '4 Persons', iconClassName: 'text-primary' },
      { icon: MapPin, label: '2 Geo Nodes', iconClassName: 'text-secondary' },
    ],
    secondaryAction: 'Inspect AI Graph',
    primaryAction: 'Sanction Escalation',
  },
  {
    id: 'inc-00389',
    code: 'INC-2026-00389',
    title: 'Interstate Illegal Arms Logistics Corridor',
    origin: 'Harbor Station // Insp. M. Selvam',
    trigger:
      'Multi-station wiretap intercept completed. Special Cell technical clearance required before intercepting shipping container docked at Terminal Berth 4.',
    meta: [
      { icon: Waypoints, label: '8 Assets' },
      { icon: TriangleAlert, label: 'Weapons Seizure Risk', iconClassName: 'text-primary' },
    ],
    secondaryAction: 'Review Audio Intercept',
    primaryAction: 'Submit to Commissioner',
    primaryTone: 'error',
  },
]

export const DIRECT_CASES: DirectCase[] = [
  {
    id: 'dsp-009',
    code: 'DSP-DIR-2026-009',
    classification: 'CONFIDENTIAL IV',
    title: 'Zonal Port Smuggling Syndicate & Customs Breach',
    summary:
      'Multi-agency taskforce tracking bonded warehouse shell companies across Harbor & Royapuram.',
    stats: ['34 Assets', '8 Entities'],
    action: 'Open Canvas',
  },
  {
    id: 'dsp-004',
    code: 'DSP-DIR-2026-004',
    classification: 'SPECIAL CELL',
    title: 'High-Denomination Counterfeit Logistics Grid',
    summary:
      'Coordination with State CID. 5 Search Warrants executed across Triplicane electronics markets.',
    stats: ['16 Assets', '5 Warrants'],
    action: 'Open Canvas',
  },
]

export const DSP_NOTEBOOKS: Notebook[] = [
  {
    id: 'nb-port',
    code: 'NB-DSP-011',
    title: 'Chennai Port Transshipment Dossier',
    summary:
      '"AI summary highlights shell entities registered under identical GSTIN in Tuticorin..."',
    updatedAt: '2h ago',
    stats: '24 pages',
    highlight: { label: '42 linked assets', tone: 'tertiary' },
    tag: { label: 'Tiptap Secure', tone: 'neutral' },
  },
  {
    id: 'nb-hawala',
    code: 'NB-DSP-008',
    title: 'Interstate Hawala Conduit Analysis',
    summary:
      '"Cross-referencing courier waybills intercepted by Egmore Crime branch with SIM dump..."',
    updatedAt: 'Yesterday',
    stats: '12 pages',
    highlight: { label: '18 linked assets', tone: 'tertiary' },
    tag: { label: 'Tiptap Secure', tone: 'neutral' },
  },
]

export const SANCTION_REQUESTS: SanctionRequest[] = [
  {
    id: 'req-2041',
    code: 'REQ-2041',
    kind: { label: 'CDR & Tower Dump', tone: 'primary' },
    officer: 'Insp. Raj Kumar',
    station: 'Central Station',
    detail: 'Re: INC-2026-00421 • 4 IMEI tower dump approval for Central Railway Station grid',
    primaryAction: 'Sanction / Sign',
    secondaryAction: 'Details',
    rejectAction: 'Reject',
  },
  {
    id: 'req-2038',
    code: 'REQ-2038',
    kind: { label: 'Section 91 Warrant', tone: 'error' },
    officer: 'Insp. M. Selvam',
    station: 'Harbor Station',
    detail: 'Special physical surveillance & asset inventory for bonded container dock 12',
    primaryAction: 'Quick Sanction',
    secondaryAction: 'Review',
  },
  {
    id: 'req-2035',
    code: 'REQ-2035',
    kind: { label: 'Out-of-State Dispatch', tone: 'secondary' },
    officer: 'Insp. K. Anbarasan',
    station: 'Triplicane',
    detail: 'Authorization to dispatch 3 SI officers to Bengaluru for suspect apprehension',
    primaryAction: 'Approve Travel',
    secondaryAction: 'Review',
  },
]

export const ACTIVE_PETITION = {
  code: '#COMM-DIR-94',
  status: 'UNDER REVIEW',
  summary:
    "Multi-Station Night Cordon Authorization across Harbor, Central & Flower Bazaar. Awaiting clearance from Commissioner's secretariat.",
}

export const UPLINK_ACTIONS: UplinkAction[] = [
  { id: 'escalate', label: 'Draft Direct Brief to Commissioner', icon: Forward },
  {
    id: 'intel',
    label: 'Request NATGRID / CCTNS Cross-District Intel',
    icon: Waypoints,
    iconClassName: 'text-secondary',
  },
]

export const THREAT_ALERTS: ThreatAlert[] = [
  {
    id: 'alert-collision',
    kind: { label: 'AI Entity Collision', tone: 'tertiary' },
    timeAgo: '3m ago',
    body: (
      <>
        Person of interest <span className="font-bold text-primary">Munna Qureshi</span> flagged on
        Harbor CCTV Terminal 2; matched with Central Station FIR-902.
      </>
    ),
    footnote: 'Match Confidence: 94.2%',
    action: 'Deploy Patrol',
  },
  {
    id: 'alert-geofence',
    kind: { label: 'Geofence Breach', tone: 'error' },
    timeAgo: '18m ago',
    body: (
      <>
        Target Vehicle <span className="font-mono font-bold text-primary">TN-09-AK-4412</span>{' '}
        tripped FastTag scanner at Toll Plaza 14 (NH-44 Corridor heading south).
      </>
    ),
    footnote: 'Linked to: Hawala Roster',
    action: 'Alert Highway Patrol',
  },
  {
    id: 'alert-witness',
    kind: { label: 'Investigator Signal', tone: 'primary' },
    timeAgo: '41m ago',
    body: (
      <>
        Insp. Raj Kumar (Central) filed urgent security flag: Key prosecution witness contacted by
        unknown international VoIP line.
      </>
    ),
    footnote: 'INC-2026-00421',
    action: 'Assign Protection',
  },
]

export const DSP_ASSETS: EvidenceAsset[] = [
  {
    id: 'asset-harbor-cctv',
    name: 'CCTV_Harbor_Gate4_Night.mp4',
    note: 'Harbor • 3 persons, 1 vehicle parsed',
    icon: Video,
    tone: 'primary',
    status: { label: 'Ready', tone: 'tertiary' },
  },
  {
    id: 'asset-ledger',
    name: 'Hawala_Ledger_Scanned.pdf',
    note: 'OCR Extraction: 18 phone nos parsed',
    icon: Landmark,
    tone: 'secondary',
    status: { label: 'Indexed', tone: 'tertiary' },
  },
  {
    id: 'asset-wiretap',
    name: 'Wiretap_Call_Rec_88.wav',
    note: 'Keyword "Consignment" identified',
    icon: AudioLines,
    tone: 'error',
    status: { label: 'Flagged', tone: 'tertiary' },
  },
]

export const ZONAL_WANTED: WantedPerson[] = [
  {
    id: 'wnt-dharma',
    name: 'D. "Dharma" Dharmalingam',
    code: 'WNT-ZA-0012',
    linkedIncidents: '8 Linked Incidents',
    lastSeen: 'Harbor & Royapuram',
    reward: '₹5,00,000',
    tier: 'A-TIER',
    chips: [
      { label: '8 Warrants', tone: 'error' },
      { label: 'Arms Logistics', tone: 'outline' },
    ],
  },
  {
    id: 'wnt-munna',
    name: 'Munna "Courier" Qureshi',
    code: 'WNT-ZA-0041',
    linkedIncidents: 'Hawala Conduit Lead',
    lastSeen: 'Terminal 2',
    reward: '₹2,00,000',
    tier: 'B-TIER',
    chips: [
      { label: 'CCTV Active', tone: 'error' },
      { label: 'Flight Risk', tone: 'outline' },
    ],
  },
]

export const INTEL_AGENCIES = [
  'NATGRID Unified Criminal Records Database',
  'Karnataka State Police (Bengaluru Cyber Syndicate Liaison)',
  'Andhra Pradesh Border Intelligence Unit',
  'Financial Intelligence Unit (FIU-IND Hawala Trace)',
]

export const ESCALATION_DRAFT = {
  subject: 'URGENT: Cross-Station Cargo Intercept & Hawala Node Breach — Central Zone',
  incidents: ['INC-2026-00421 (Warehouse Theft)', 'INC-2026-00389 (Harbor Arms)'],
  summary:
    'Sir, Intelligence synthesis indicates Hawala money movement is directly fueling the transshipment arms channel through Berth 4. Requesting CP authorization for immediate multi-station night cordon across 3 stations and direct CID Special Operations liaison.',
}
