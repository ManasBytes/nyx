import { useEffect, useState } from 'react'
import { getLocations, type Location } from '@/lib/locations'
import type { JurisdictionField } from '@/lib/roles'

export type JurisdictionValue = Record<JurisdictionField, string>

export function useJurisdiction() {
  const [value, setValue] = useState<JurisdictionValue>({ state: '', district: '', zone: '', city: '' })
  const [states, setStates] = useState<Location[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const [zones, setZones] = useState<Location[]>([])
  const [cities, setCities] = useState<Location[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getLocations('states')
      .then((nextStates) => {
        setStates(nextStates)
        if (nextStates.length === 1) setValue((current) => ({ ...current, state: String(nextStates[0].id) }))
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load jurisdiction options.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!value.state) return
    getLocations('districts', value.state).then(setDistricts).catch((err) => setError(err.message))
  }, [value.state])

  useEffect(() => {
    if (!value.district) return
    getLocations('zones', value.district).then(setZones).catch((err) => setError(err.message))
  }, [value.district])

  useEffect(() => {
    if (!value.zone) return
    getLocations('cities', value.zone).then(setCities).catch((err) => setError(err.message))
  }, [value.zone])

  function select(field: JurisdictionField, next: string) {
    if (field === 'state') return setValue({ state: next, district: '', zone: '', city: '' })
    if (field === 'district') return setValue((prev) => ({ ...prev, district: next, zone: '', city: '' }))
    if (field === 'zone') return setValue((prev) => ({ ...prev, zone: next, city: '' }))
    setValue((prev) => ({ ...prev, city: next }))
  }

  return {
    value,
    states: states.map(toOption),
    districts: districts.map(toOption),
    zones: zones.map(toOption),
    cities: cities.map(toOption),
    select,
    error,
    isLoading,
  }
}

function toOption(location: Location) {
  return { value: String(location.id), label: location.name }
}
