import { ethers } from 'ethers'

export function bigNumberify (value) {
  if (!value) {
    return ethers.utils.bigNumberify(0)
  }

  return ethers.utils.bigNumberify(value)
}
