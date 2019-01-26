import { ethers } from 'ethers'

export function sha3 (string) {
  return ethers.utils.sha256(string)
}
