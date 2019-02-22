import { dateRelativeMs } from '~/utils/dateRelativeMs'
import { secondsToMs } from '~/utils/secondsToMs'

/**
 * Returns a date in relative terms, such as '4 days ago'
 * or 'about 1 hour ago', etc.
 *
 * @returns {String}
 */
export function displayEthTimestamp (timestamp) {
  return dateRelativeMs(secondsToMs(timestamp))
}
