export function greetingFor(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  return hour < 17 ? 'Good afternoon' : 'Good evening'
}
