const JURISDICTIONS: Record<string, Record<string, string[]>> = {
  Chennai: {
    'North Zone': ['Royapuram', 'Flower Bazaar', 'Washermanpet'],
    'Central Zone': ['Egmore', 'Triplicane', 'Chintadripet'],
    'South Zone': ['Adyar', 'Guindy', 'Velachery'],
  },
  Coimbatore: {
    'East Zone': ['Peelamedu', 'Singanallur'],
    'West Zone': ['Saibaba Colony', 'Podanur'],
  },
  Madurai: {
    'Central Zone': ['Tallakulam', 'Anna Nagar'],
    'Rural Zone': ['Melur', 'Usilampatti'],
  },
}

export function getDistricts() {
  return Object.keys(JURISDICTIONS)
}

export function getZones(district: string) {
  return Object.keys(JURISDICTIONS[district] ?? {})
}

export function getCities(district: string, zone: string) {
  return JURISDICTIONS[district]?.[zone] ?? []
}
