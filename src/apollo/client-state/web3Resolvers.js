import { getProvider } from '~/web3/getProvider'

export default {
  resolvers: {
    Query: {
      networkId: async function () {
        const network = await getProvider().getNetwork()
        return network.chainId
      }
    }
  }
}
