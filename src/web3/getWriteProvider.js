import { ethers } from 'ethers'
import { getNetworkName } from './getNetworkName'

export async function getWriteProvider () {
  if (window && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum)
  } else if (window && window.web3) {
    const networkName = await getNetworkName()
    return new ethers.providers.Web3Provider(window.web3.currentProvider, networkName)
  } else {
    throw new Error('You must have a web3-enabled browser to send Ethereum transactions')
  }
}
