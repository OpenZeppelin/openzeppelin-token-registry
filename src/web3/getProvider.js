import { ethers } from 'ethers'

export function getProvider () {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum)
  } else {
    if (!process.env.REACT_APP_DEFAULT_NETWORK_NAME) {
      throw new Error('You must define the enviroment variable REACT_APP_DEFAULT_NETWORK_NAME')
    }
    return ethers.getDefaultProvider(process.env.REACT_APP_DEFAULT_NETWORK_NAME)
  }
}
