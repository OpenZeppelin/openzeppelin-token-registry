import { getInjectedWeb3 } from './getInjectedWeb3'
import { getReadWeb3 } from './getReadWeb3'

export async function getClient() {
  const injectedWeb3 = getInjectedWeb3()
  let networkId
  if (injectedWeb3) {
    networkId = await injectedWeb3.eth.net.getId()
  }
  const web3 = getReadWeb3(networkId)
  return web3
}
