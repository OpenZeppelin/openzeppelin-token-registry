import { formatRelative } from 'date-fns'
import { bigNumberify } from './bigNumberify'

export function dateRelativeMs (pastTimestamp, futureTimestamp = new Date()) {
  if (!pastTimestamp) { return '' }
  if (pastTimestamp instanceof Date) {
    return formatRelative(pastTimestamp, futureTimestamp)
  } else {
    return formatRelative(bigNumberify(pastTimestamp).toNumber(), futureTimestamp)
  }
}
