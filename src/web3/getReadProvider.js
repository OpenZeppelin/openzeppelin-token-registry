import { ethers } from 'ethers'

async function createProviderFromWeb3 (injectedWeb3) {
  let provider = new ethers.providers.Web3Provider(injectedWeb3)
  const network = await provider.getNetwork()
  if (network.name !== 'unknown') {
    provider = ethers.getDefaultProvider(network.name)
  } else {
    provider = new ethers.providers.JsonRpcProvider(provider.connection.url)
  }
  return provider
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
  let provider
  if (window && window.web3) {
    provider = await createProviderFromWeb3(window.web3.currentProvider)
  } else if (window && window.ethereum) {
    provider = await createProviderFromWeb3(window.ethereum)
  } else {
    if (!process.env.REACT_APP_DEFAULT_NETWORK_NAME) {
      throw new Error('You must define the enviroment variable REACT_APP_DEFAULT_NETWORK_NAME')
    }
    provider = ethers.getDefaultProvider(process.env.REACT_APP_DEFAULT_NETWORK_NAME)
  }
  return provider
}
