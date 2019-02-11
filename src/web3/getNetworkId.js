import { getNetworkName } from '~/web3/getNetworkName'
import { ethers } from 'ethers'

export async function getNetworkId () {
  const network = ethers.utils.getNetwork(await getNetworkName())
  if (network) {
    return network.chainId
  }
  return null
}
