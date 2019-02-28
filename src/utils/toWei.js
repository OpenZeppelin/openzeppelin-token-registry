import { ethers } from 'ethers'

export function toWei (ether) {
  if (!ether) {
    return ethers.utils.bigNumberify(0)
  }

  return ethers.utils.parseUnits(ether, 'ether')
}
