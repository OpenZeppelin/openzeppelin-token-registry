import { getInjectedWeb3 } from '~/getInjectedWeb3'

export default {
  resolvers: {
    Query: {
      networkId: async function () {
        return getInjectedWeb3().eth.net.getId()
      }
    }
  }
}
