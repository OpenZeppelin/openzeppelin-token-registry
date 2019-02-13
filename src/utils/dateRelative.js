import { formatRelative } from 'date-fns'
import { ethers } from 'ethers'

export function dateRelative (pastTimestamp, futureTimestamp) {
  if (!pastTimestamp) { return '' }

  if (ethers.utils.BigNumber.isBigNumber(pastTimestamp)) {
    pastTimestamp = pastTimestamp.toNumber()
  }

  return formatRelative(pastTimestamp, futureTimestamp || new Date())
}
