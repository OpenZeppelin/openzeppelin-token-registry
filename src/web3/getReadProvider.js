import { ethers } from 'ethers'

export function getReadProvider () {
  if (!process.env.REACT_APP_DEFAULT_NETWORK_NAME) {
    throw new Error('You must define the enviroment variable REACT_APP_DEFAULT_NETWORK_NAME')
  }
  return ethers.getDefaultProvider(process.env.REACT_APP_DEFAULT_NETWORK_NAME)
}
