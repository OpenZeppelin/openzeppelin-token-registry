import { dateRelativeMs } from '~/utils/dateRelativeMs'
import { secondsToMs } from '~/utils/secondsToMs'

export function displayEthTimestamp (timestamp) {
  return dateRelativeMs(secondsToMs(timestamp))
}
