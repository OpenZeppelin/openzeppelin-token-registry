import { ethers } from 'ethers'

let provider

async function getNetworkName () {
  let tempProvider, network, networkName
  if (window && window.ethereum) {
    tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    network = await tempProvider.getNetwork()
    networkName = network.name
  } else if (window && window.web3) {
    if (window.web3.currentProvider.isToshi) {
      network = ethers.utils.getNetwork(parseInt(window.web3.version.network, 10))
    } else {
      tempProvider = new ethers.providers.Web3Provider(window.web3.currentProvider)
      network = await tempProvider.getNetwork()
    }
    networkName = network.name
  } else {
    if (!process.env.REACT_APP_DEFAULT_NETWORK_NAME) {
      throw new Error('You must define the enviroment variable REACT_APP_DEFAULT_NETWORK_NAME')
    }
    networkName = process.env.REACT_APP_DEFAULT_NETWORK_NAME
  }

  return networkName
}

/**
  Retrieves a new provider specific to read.  The reason we separate the read and the writes is that the
  web3 providers on mobile dapps are extremely buggy; it's better to read the network through an INFURA
  JsonRpc endpoint.

  This function will first check to see if there is an injected web3.  If web3 is being injected, then a
  Ethers Web3Provider is instantiated to check the network.  Once the network is determined the Ethers
  getDefaultProvider function is used to create a provider pointing to the same network using an Infura node.
*/
export async function getReadProvider () {
  if (provider) { return provider }

  const networkName = await getNetworkName()

  if (networkName !== 'unknown') {
    provider = ethers.getDefaultProvider(networkName)
  } else {
    provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  }

  return provider
}
