import { transactionQueries } from '~/queries/transactionQueries'

export const transactionResolvers = {
  defaults: {
    transactions: []
  },
  resolvers: {
    Query: {
      getUncompletedTransactionsByPackageId: async function (object, args, context, info) {
        console.log('running resolver')
        let txs = []
        let allTransactions

        const { packageId } = args
        console.log(txs, packageId)

        try {
          console.log(context)
          allTransactions = context.cache.readQuery({
            query: transactionQueries.allTransactionsQuery
          })
        } catch (error) {
          console.warn(error)
        }

        console.log('allTransactions', allTransactions)

        // tx = allTransactions.transactions.find(transaction => transaction.packageId === packageId)
        txs = allTransactions.transactions.filter(tx => {
          console.log(tx)
          return (
            tx.packageId === packageId && !tx.completed
          )
        })

        return txs
      }
    }
  }
}
