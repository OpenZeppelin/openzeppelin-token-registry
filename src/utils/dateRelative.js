import { formatRelative } from 'date-fns'

export function dateRelative (pastTimestamp, futureTimestamp) {
  if (!pastTimestamp) { return '' }

  return formatRelative(pastTimestamp, futureTimestamp || new Date())
}
