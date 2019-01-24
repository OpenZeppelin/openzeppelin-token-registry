import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'
import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { transactionQueries } from '~/queries/transactionQueries'

export default {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache, getCacheKey }) => {
        const { packageId, method, args } = variables.txData

        const injectedWeb3 = getInjectedWeb3()
        const networkId = await injectedWeb3.eth.net.getId()

        await getMetamaskPermissions()

        const accounts = await injectedWeb3.eth.getAccounts()
        const currentAddress = accounts[0]

        const abi = abiMapping.getAbi('Vouching')
        const contractAddress = abiMapping.getAddress('Vouching', networkId)
        const contract = new injectedWeb3.eth.Contract(abi, contractAddress)
        const contractMethod = contract.methods[method]

        if (!contractMethod) {
          console.error(`Address ${contractAddress} does not have method '${method}'`)
          return
        }

        contractMethod(...args).send({ from: currentAddress }).on(
          'transactionHash', function (hash) {
            let data = { transactions: [] }

            console.log('packageId: ', packageId)
            console.log(getCacheKey({ id: packageId, __typename: 'Transaction'}))

            try {
              data = window.client.readQuery({
                query: transactionQueries.allTransactionsQuery
              })
            } catch (error) {
              // console.log(error)
            }

            // data = {
            //   ...data.transactions,
            //   {
            //     id: packageId,
            //     __typename: 'Transaction',
            //     hash,
            //     txData: variables.txData
            //   }
            // }
            // transactions.push()
            console.log('data', data)

            const newTx = {
              id: packageId,
              hash,
              txData: variables.txData,
              __typename: 'Transaction'
            }

            // Note: This should work but using window.client.write* works much
            // better for broadcasting / reloading query data on write
            // const result = cache.writeData({
            //   data
            // })

            // shouldn't be necessary
            // cache.broadcastWatches()

            window.client.writeQuery({
              query: transactionQueries.allTransactionsQuery,
              data: {
                transactions: [...data.transactions, newTx]
              }
            })
            console.log('data', data)

            return {
              data
            }
          }
        )

        return null
      }
    }
  }
}
