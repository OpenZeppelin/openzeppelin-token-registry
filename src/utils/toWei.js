import { ethers } from 'ethers'

export function toWei (ether) {
  if (!ether) {
    return ''
  }

  return ethers.utils.parseUnits(ether, 'ether')
}
