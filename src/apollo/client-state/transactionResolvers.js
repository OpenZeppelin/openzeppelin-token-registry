import { transactionQueries } from '~/queries/transactionQueries'

export const transactionResolvers = {
  defaults: {
    transactions: []
  },
  resolvers: {
    Query: {
      getAllTransactionsByPackageId: async function (object, args, context, info) {
        let txs = []
        let allTransactions

        const { packageId } = args

        try {
          allTransactions = context.cache.readQuery({
            query: transactionQueries.allTransactionsQuery
          })
        } catch (error) {
          console.warn(error)
        }

        txs = allTransactions.transactions.filter(tx => (tx.packageId._hex === packageId._hex))

        return txs
      }
    }
  }
}
