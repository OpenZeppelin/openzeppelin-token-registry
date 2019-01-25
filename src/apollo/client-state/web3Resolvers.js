import { getClient } from '~/web3/getClient'
import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'

export const web3Resolvers = {
  resolvers: {
    Query: {
      networkId: async function () {
        var web3 = getInjectedWeb3()
        if (!web3) {
          return parseInt(process.env.REACT_APP_DEFAULT_PROVIDER_URL_NETWORK_ID, 10)
        } else {
          return web3.eth.net.getId()
        }
      },
      block: async function (object, args, context, info) {
        args = Object.assign({
          numberOrHash: 'latest',
          includeTransactions: false
        }, args)

        const web3 = await getClient()
        try {
          const block = await web3.eth.getBlock(args.numberOrHash, args.includeTransactions)

          return {
            id: block.number,
            __typename: 'Block',
            block
          }
        } catch (error) {
          console.error(error)
          return null
        }
      }
    }
  }
}
