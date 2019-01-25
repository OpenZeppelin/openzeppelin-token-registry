import { ethers } from 'ethers'

export function displayWeiToEther (wei) {
  if (!wei) {
    return ''
  }

  return ethers.utils.commify(ethers.utils.formatEther(wei.toString()))
}
