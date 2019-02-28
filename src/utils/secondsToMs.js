import { bigNumberify } from './bigNumberify'

export function secondsToMs (timestamp) {
  if (!timestamp) { return 0 }
  if (timestamp instanceof Date) {
    return timestamp
  } else {
    return bigNumberify(timestamp).mul(1000)
  }
}
