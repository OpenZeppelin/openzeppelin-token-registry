import { getProvider } from '~/web3/getProvider'

export const web3Resolvers = {
  resolvers: {
    Query: {
      networkId: async function () {
        const network = await getProvider().getNetwork()
        return network.chainId
      },
      account: async function () {
        const signer = getProvider().getSigner()

        if (signer) {
          try {
            const address = await signer.getAddress()
            return address
          } catch (err) {
            return null
          }
        }
      }
    }
  }
}
