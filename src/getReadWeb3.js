import Web3 from 'web3'

/**
  Many mobile dapp browsers have incomplete web3 implementations so it's better to directly connect to Infura.
*/

export async function getReadWeb3(networkId) {
  var providerUrl
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
  return new Web3(new Web3.providers.HttpProvider(providerUrl))
}
