import { useEffect, useState } from 'react'
import { listCities, listDistricts, listStates, listZones, type GeoOption } from '@/lib/roles'

export function useJurisdictionCascade() {
  const [states, setStates] = useState<GeoOption[]>([])
  const [districts, setDistricts] = useState<GeoOption[]>([])
  const [zones, setZones] = useState<GeoOption[]>([])
  const [cities, setCities] = useState<GeoOption[]>([])

  const [stateId, setStateId] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [zoneId, setZoneId] = useState('')
  const [cityId, setCityId] = useState('')

  // Drop stale children the moment a parent selection changes. This runs
  // during render (React's documented pattern for cascading selects), not
  // in an effect, so it doesn't trigger an extra post-commit render pass.
  const [syncedStateId, setSyncedStateId] = useState(stateId)
  if (stateId !== syncedStateId) {
    setSyncedStateId(stateId)
    setDistrictId('')
    setDistricts([])
    setZoneId('')
    setZones([])
    setCityId('')
    setCities([])
  }

  const [syncedDistrictId, setSyncedDistrictId] = useState(districtId)
  if (districtId !== syncedDistrictId) {
    setSyncedDistrictId(districtId)
    setZoneId('')
    setZones([])
    setCityId('')
    setCities([])
  }

  const [syncedZoneId, setSyncedZoneId] = useState(zoneId)
  if (zoneId !== syncedZoneId) {
    setSyncedZoneId(zoneId)
    setCityId('')
    setCities([])
  }

  useEffect(() => {
    listStates().then((all) => {
      setStates(all)
      // This is a single-state deployment - preselect it instead of making
      // the user pick from a list of one.
      if (all.length === 1) setStateId(String(all[0].id))
    })
  }, [])

  useEffect(() => {
    if (stateId) listDistricts(Number(stateId)).then(setDistricts)
  }, [stateId])

  useEffect(() => {
    if (districtId) listZones(Number(districtId)).then(setZones)
  }, [districtId])

  useEffect(() => {
    if (zoneId) listCities(Number(zoneId)).then(setCities)
  }, [zoneId])

  function reset() {
    setStateId(states.length === 1 ? String(states[0].id) : '')
    setDistrictId('')
    setZoneId('')
    setCityId('')
  }

  return {
    states,
    districts,
    zones,
    cities,
    stateId,
    setStateId,
    districtId,
    setDistrictId,
    zoneId,
    setZoneId,
    cityId,
    setCityId,
    reset,
  }
}
