import { useState } from 'react'
import { getCities, getDistricts, getZones } from '@/lib/jurisdictions'
import type { JurisdictionField } from '@/lib/roles'

export type JurisdictionValue = Record<JurisdictionField, string>

export function useJurisdiction() {
  const [value, setValue] = useState<JurisdictionValue>({ district: '', zone: '', city: '' })

  function select(field: JurisdictionField, next: string) {
    if (field === 'district') return setValue({ district: next, zone: '', city: '' })
    if (field === 'zone') return setValue((prev) => ({ ...prev, zone: next, city: '' }))
    setValue((prev) => ({ ...prev, city: next }))
  }

  return {
    value,
    districts: getDistricts(),
    zones: value.district ? getZones(value.district) : [],
    cities: value.zone ? getCities(value.district, value.zone) : [],
    select,
  }
}
