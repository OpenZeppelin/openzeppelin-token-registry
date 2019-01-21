import { getClient } from '~/web3/getClient'

export default {
  resolvers: {
    Query: {
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
