import { transactionQueries } from '~/queries/transactionQueries'

export const transactionResolvers = {
  defaults: {
    transactions: []
  },
  resolvers: {
    Query: {
      getUncompletedTransactionsByPackageId: async function (object, args, context, info) {
        let txs = []

        const { packageId } = args

        const allTransactions = context.cache.readQuery({
          query: transactionQueries.allTransactionsQuery
        })

        // tx = allTransactions.transactions.find(transaction => transaction.packageId === packageId)
        txs = allTransactions.transactions.filter(transaction => {
          return (
            transaction.packageId === packageId && !transaction.completed
          )
        })

        return txs
      }
    }
  }
}
