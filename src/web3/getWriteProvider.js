import { ethers } from 'ethers'

export function getWriteProvider () {
  if (window && window.web3) {
    return new ethers.providers.Web3Provider(window.web3.currentProvider)
  } else {
    throw new Error('You must have a web3-enabled browser to send Ethereum transactions')
  }
}
