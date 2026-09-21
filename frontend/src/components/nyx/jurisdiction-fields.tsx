import type { useJurisdiction } from '@/hooks/useJurisdiction'
import type { JurisdictionField } from '@/lib/roles'
import { SelectField } from './select-field'

export function JurisdictionFields({
  fields,
  jurisdiction,
}: {
  fields: JurisdictionField[]
  jurisdiction: ReturnType<typeof useJurisdiction>
}) {
  const { value, districts, zones, cities, select } = jurisdiction

  return (
    <>
      {fields.includes('state') ? (
        <SelectField
          id="state"
          name="state"
          label="State"
          options={jurisdiction.states}
          value={value.state}
          onChange={(event) => select('state', event.target.value)}
          placeholder="Select state…"
          required
        />
      ) : null}
      {fields.includes('district') ? (
        <SelectField
          id="district"
          name="district"
          label="District"
          options={districts}
          value={value.district}
          onChange={(event) => select('district', event.target.value)}
          placeholder="Select district…"
          required
        />
      ) : null}
      {fields.includes('zone') ? (
        <SelectField
          id="zone"
          name="zone"
          label="Zone"
          options={zones}
          value={value.zone}
          onChange={(event) => select('zone', event.target.value)}
          placeholder={value.district ? 'Select zone…' : 'Select a district first'}
          disabled={!value.district}
          required
        />
      ) : null}
      {fields.includes('city') ? (
        <SelectField
          id="city"
          name="city"
          label="City / Station Area"
          options={cities}
          value={value.city}
          onChange={(event) => select('city', event.target.value)}
          placeholder={value.zone ? 'Select city…' : 'Select a zone first'}
          disabled={!value.zone}
          required
        />
      ) : null}
    </>
  )
}
