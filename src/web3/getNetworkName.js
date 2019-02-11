import { ethers } from 'ethers'

export async function getNetworkName () {
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
