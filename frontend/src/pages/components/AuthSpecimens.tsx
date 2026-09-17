import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AuthBrandRail,
  AuthField,
  AuthLayout,
  DevLoginPanel,
  FormAlert,
  JurisdictionFields,
  RoleSelect,
  SelectField,
} from '@/components/nyx'
import { useJurisdiction } from '@/hooks/useJurisdiction'
import { ROLES, roleOption, type Role } from '@/lib/roles'
import { Specimen, SpecimenGroup } from './Specimen'

const ROUTES = [
  ['/login', 'Sign in (also served at /sign-in)'],
  ['/signup', 'Create account'],
  ['/forgot-password', 'Password recovery'],
]

export function AuthSpecimens() {
  const [role, setRole] = useState<Role>('inspector')
  const jurisdiction = useJurisdiction()
  const level = roleOption(role) ?? ROLES[2]

  return (
    <SpecimenGroup title="Authentication" subtitle="Sign-in, sign-up and recovery surfaces">
      <Specimen name="AuthLayout" note="full-screen split layout, previewed at fixed height">
        <div className="h-[30rem] overflow-hidden rounded [&>div]:h-full [&>div]:min-h-0">
          <AuthLayout
            eyebrow="Secure Access"
            title="Sign in to your station"
            subtitle="Authenticate with your issued departmental credentials."
            headline="Investigation operations, under one command grid."
            blurb="Incidents, notebooks, evidence and zonal command in a single auditable workspace."
            footer={<span>No account yet? Request access</span>}
          >
            <AuthField id="preview-email" label="Official Email" placeholder="inspector@police.gov.in" />
          </AuthLayout>
        </div>
      </Specimen>
      <Specimen name="AuthBrandRail" note="left rail — hidden below the lg breakpoint">
        <div className="h-[22rem] overflow-hidden rounded [&>aside]:flex">
          <AuthBrandRail
            headline="Every entry signed. Every action accountable."
            blurb="Case diaries, evidence chains and sanction trails carry a tamper-evident audit log."
          />
        </div>
      </Specimen>
      <Specimen name="Auth routes" note="live pages">
        <div className="flex flex-col gap-space-sm">
          {ROUTES.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className="flex items-center justify-between rounded bg-surface-container px-space-md py-space-sm transition-colors hover:bg-surface-container-high"
            >
              <code className="font-mono text-label-lg text-primary">{path}</code>
              <span className="text-body-sm text-on-surface-variant">{label}</span>
            </Link>
          ))}
        </div>
      </Specimen>
      <Specimen name="AuthField" note="mono label, optional action slot">
        <div className="flex max-w-md flex-col gap-space-md">
          <AuthField
            id="specimen-email"
            label="Official Email"
            type="email"
            placeholder="inspector@police.gov.in"
          />
          <AuthField
            id="specimen-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            action={<span className="font-mono text-label-sm text-secondary">Forgot password?</span>}
          />
        </div>
      </Specimen>
      <Specimen name="RoleSelect" note="CP / DSP / Inspector — drives which jurisdiction fields show">
        <div className="max-w-2xl">
          <RoleSelect value={role} onValueChange={setRole} />
        </div>
      </Specimen>
      <Specimen name="JurisdictionFields" note={`cascading — ${level.label} asks for ${level.fields.join(', ')}`}>
        <div className="flex max-w-md flex-col gap-space-md">
          <JurisdictionFields fields={level.fields} jurisdiction={jurisdiction} />
        </div>
      </Specimen>
      <Specimen name="SelectField" note="themed native select">
        <div className="max-w-md">
          <SelectField id="specimen-select" label="District" options={['Chennai', 'Coimbatore']} />
        </div>
      </Specimen>
      <Specimen name="DevLoginPanel" note="one-click sign in, dev builds only">
        <div className="max-w-md">
          <DevLoginPanel onSelect={() => {}} />
        </div>
      </Specimen>
      <Specimen name="FormAlert" note="error and success tones">
        <div className="flex max-w-md flex-col gap-space-sm">
          <FormAlert tone="error">Invalid credentials. Check your email and password.</FormAlert>
          <FormAlert tone="success">Recovery link sent. It expires in 30 minutes.</FormAlert>
        </div>
      </Specimen>
    </SpecimenGroup>
  )
}
