import { ethers } from 'ethers'

export function getProvider () {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum)
  } else {
    return ethers.getDefaultProvider('ropsten')
  }
}
