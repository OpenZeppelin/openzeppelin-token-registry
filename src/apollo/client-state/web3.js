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
          const networkId = await web3.eth.net.getId()
          const block = await web3.eth.getBlock(args.numberOrHash, args.includeTransactions)

          return {
            id: block.number,
            __typename: 'Block',
            block,
            networkId
          }
        } catch (error) {
          console.error(error)
          return null
        }
      },

      transactionReceipt: async function (object, args, context, info) {
        args = Object.assign({
          txHash: null
        }, args)
        if (!args.txHash) { throw new Error('Must pass txhash') }

        const web3 = await getClient()

        try {
          const receipt = await web3.eth.getTransactionReceipt(args.txHash)

          return {
            id: args.txHash,
            __typename: 'TransactionReceipt',
            receipt
          }
        } catch (error) {
          console.error(error)
          return null
        }
      }
    }
  }
}
