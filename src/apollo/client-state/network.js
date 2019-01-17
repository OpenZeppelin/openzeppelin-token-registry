import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'

export default {
  resolvers: {
    Query: {
      networkId: async function () {
        var web3 = getInjectedWeb3()
        if (!web3) {
          return process.env.REACT_APP_DEFAULT_PROVIDER_URL_NETWORK_ID
        } else {
          return web3.eth.net.getId()
        }
      }
    }
  }
}
