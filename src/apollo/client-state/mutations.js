import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'
import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { transactionQueries } from '~/queries/transactionQueries'

export default {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache }) => {
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
            const data = {
              transactions: {
                id: packageId,
                __typename: 'Transaction',
                packageId,
                hash,
                txData: variables.txData
              }
            }

            const result = cache.writeQuery({
              query: transactionQueries.transactionsQuery,
              data
            })
            // console.log(_, variables, cache)

            cache.broadcastWatches()

            // console.log('result', result)
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
