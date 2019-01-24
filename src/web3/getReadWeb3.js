import Web3 from 'web3'

/**
  Many mobile dapp browsers have incomplete web3 implementations so it's better to directly connect to Infura.
*/

export function getReadWeb3 (networkId) {
  var providerUrl
  if (networkId) {
    switch (networkId) {
      case 1:
        providerUrl = process.env.REACT_APP_MAINNET_PROVIDER_URL
        break
      case 3:
        providerUrl = process.env.REACT_APP_ROPSTEN_PROVIDER_URL
        break
      case 4:
        providerUrl = process.env.REACT_APP_RINKEBY_PROVIDER_URL
        break
      default:
        providerUrl = process.env.REACT_APP_DEFAULT_PROVIDER_URL
    }
  }
  if (!providerUrl) {
    providerUrl = process.env.REACT_APP_DEFAULT_PROVIDER_URL
  }
  let provider
  if (providerUrl.startsWith('ws')) {
    provider = new Web3.providers.WebsocketProvider(providerUrl)
  } else {
    provider = new Web3.providers.HttpProvider(providerUrl)
  }
  return new Web3(provider)
}
