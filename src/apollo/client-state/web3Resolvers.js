import { getReadProvider } from '~/web3/getReadProvider'
import { getWriteProvider } from '~/web3/getWriteProvider'
import { isToshi } from '~/web3/isToshi'

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const web3Resolvers = {
  resolvers: {
    Query: {
      networkId: async function () {
        const provider = await getReadProvider()
        const network = await provider.getNetwork()
        return network.chainId
      },
      account: async function () {
        if (isToshi()) {
          let accounts = window.web3.eth.accounts
          if (accounts.length) {
            return accounts[0]
          }
        } else {
          let provider
          try {
            provider = await getWriteProvider()
          } catch (e) {}
          if (!provider) { return null }
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
        }
      }
    }
  }
}
