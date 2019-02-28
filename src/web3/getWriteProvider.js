import { ethers } from 'ethers'
import { getNetworkName } from './getNetworkName'

/**
  Retrieves a new provider specific for sending transactions.
  The reason we separate the read and the writes is that the
  web3 providers on mobile dapps are extremely buggy; it's
  better to read the network through an INFURA JsonRpc endpoint.

  This function will first check to see if there is an injected web3
  which is using the new window.ethereum API. It will fall back to
  the older style with window.web3. If web3 is being injected,
  then an Ethers Web3Provider is instantiated and returned.
*/
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
