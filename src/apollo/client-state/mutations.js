import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { ethers } from 'ethers'
import { transactionQueries } from '~/queries/transactionQueries'

export const mutations = {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache, getCacheKey }) => {
        const { method, args } = variables.txData
        await getMetamaskPermissions()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const address = abiMapping.getAddress('Vouching', network.chainId)
        const abi = abiMapping.getAbi('Vouching')
        const contract = new ethers.Contract(address, abi, signer)

        const methodFxn = contract[method]

        if (!methodFxn) {
          throw new Error(`Unknown function ${method} for contract Vouching`)
        }

        methodFxn(...args)
          .then(function (event) {
            console.log('received hash', event.hash)

            let data = { transactions: [] }
            const query = transactionQueries.allTransactionsQuery

            // console.log('getCacheKey', getCacheKey({ hash, __typename: 'Transaction'}))

            try {
              data = window.client.readQuery({ query })
            } catch (error) {
              console.error(error)
            }

            const newTx = {
              hash: event.hash,
              completed: false,
              ...variables.txData,
              __typename: 'Transaction'
            }

            if (data.transactions) {
              data.transactions.push(newTx)
            } else {
              data.transactions = [newTx]
            }

            window.client.writeQuery({ query, data })

            return null
          })
      }
    }
  }
}
