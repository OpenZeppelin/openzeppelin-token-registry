import { getProvider } from '~/web3/getProvider'
import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
// import { transactionQueries } from '~/queries/transactionQueries'

export const mutations = {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache, getCacheKey }) => {
        const { method, args } = variables.txData

        const ethers = getProvider()
        const network = await ethers.getNetwork()
        const { networkId } = network

        await getMetamaskPermissions()

        const accounts = await ethers.eth.getAccounts()
        const currentAddress = accounts[0]

        const abi = abiMapping.getAbi('Vouching')
        const contractAddress = abiMapping.getAddress('Vouching', networkId)
        const contract = new ethers.Contract(abi, contractAddress)
        const contractMethod = contract[method]

        if (!contractMethod) {
          console.error(`Address ${contractAddress} does not have method '${method}'`)
          return
        }

        let result = contractMethod(...(args.concat([{ from: currentAddress }])))

        result.then(function () {
          console.log('promise args: ', arguments)
        })

        /*
        .on(
          'transactionHash', function (hash) {
            let data = { transactions: [] }
            const query = transactionQueries.allTransactionsQuery

            // console.log('getCacheKey', getCacheKey({ hash, __typename: 'Transaction'}))

            try {
              data = window.client.readQuery({ query })
            } catch (error) {
              // console.log(error)
            }

            const newTx = {
              hash,
              completed: false,
              ...variables.txData,
              __typename: 'Transaction'
            }

            data.transactions.push(newTx)

            window.client.writeQuery({ query, data })
            // cache.broadcastWatches()

            return {
              data
            }
          }
        )
*/
        return null
      }
    }
  }
}
