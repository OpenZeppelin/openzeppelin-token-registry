import { allowedNetworkIds } from '~/web3/allowedNetworkIds'

export function isValidNetwork (networkId, nullResponse = false) {
  if (!networkId) {
    return nullResponse
  }
  return allowedNetworkIds().indexOf(networkId) !== -1
}
