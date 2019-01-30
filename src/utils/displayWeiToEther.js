import { ethers } from 'ethers'

export function displayWeiToEther (wei) {
  if (!wei) {
    return ''
  }

  const etherValueAsString = ethers.utils.commify(
    ethers.utils.formatEther(wei.toString(), { commify: true })
  )
  const etherValueAsInt = etherValueAsString.replace(/\.[\d]*/, '')

  return etherValueAsInt
}
