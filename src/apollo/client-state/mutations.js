import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { ethers } from 'ethers'
import { transactionQueries } from '~/queries/transactionQueries'

let nextTxId = 1

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

        let data = { transactions: [] }
        const query = transactionQueries.allTransactionsQuery

        const txId = nextTxId++

        try {
          data = cache.readQuery({ query })
          // console.log('existing data', data)
        } catch (error) {
          console.error(error)
        }

        // const newArgs = Array.from(args)
        // newArgs.__typename = 'JSON'

        const newArgs = {
          values: Array.from(args).map(arg => arg.toString()),
          __typename: 'JSON'
        }

        const newTx = {
          error: '',
          completed: false,
          method,
          args: newArgs,
          hash: '',
          id: txId,
          __typename: 'Transaction',
          type: 'Transaction'
        }

        if (data.transactions) {
          data.transactions.push(newTx)
        } else {
          data.transactions = [newTx]
        }

        cache.writeQuery({ query, data })
        console.log('form sent')

        const gasLimit = await contract.estimate[method](...args)
        // Hack to ensure it works!
        const newGasLimit = gasLimit.add(3000)

        methodFxn(...args.concat([{ gasLimit: newGasLimit }]))
          .then(async function (event) {
            const receipt = await provider.getTransactionReceipt(event.hash)
            const error = receipt.status === 0
            const id = `Transaction:${txId}`
            const transaction = cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
            const data = { ...transaction, hash: event.hash, completed: true, error }
            cache.writeData({ id, data })

            return data
          })
          .catch(error => {
            console.error(error)
            // // if (error.message === 'Error: MetaMask Tx Signature: User denied transaction signature.') { return }
            // const errorMessage = error.message
            //
            // const id = `Transaction:${txId}`
            // const transaction = cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
            // const data = { ...transaction, args: newArgs, completed: true, error: errorMessage }
            // console.log('newdata', data)
            // cache.writeData({ id, data })
            //
            // return data
          })

        return null
      }
    }
  }
}
