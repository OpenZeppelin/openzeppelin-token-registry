import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'

export default {
  resolvers: {
    Query: {
      networkId: async function () {
        return getInjectedWeb3().eth.net.getId()
      }
    }
  }
}
