import { getReadProvider } from '~/web3/getReadProvider'
import { getWriteProvider } from '~/web3/getWriteProvider'

export const web3Resolvers = {
  resolvers: {
    Query: {
      networkId: async function () {
        const provider = await getReadProvider()
        const network = await provider.getNetwork()
        return network.chainId
      },
      account: async function () {
        let provider
        try {
          provider = getWriteProvider()
        } catch (error) {
          // console.error(error)
          console.warn('Browser is not an Ethereum-powered browser')
        }

        if (provider) {
          try {
            const signer = provider.getSigner()
            const address = await signer.getAddress()
            return address
          } catch (err) {
            if (err.message.indexOf('unknown account') === -1) {
              console.error(`Error in web3Resolvers#account: ${err}`)
            }
            return null
          }
        } else {
          return null
        }
      }
    }
  }
}
