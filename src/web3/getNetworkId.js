import { getReadProvider } from '~/web3/getReadProvider'

export async function getNetworkId () {
  const provider = await getReadProvider()
  const network = await provider.getNetwork()
  if (network) {
    return network.chainId
  }
  return null
}
