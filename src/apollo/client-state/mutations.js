import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { ethers } from 'ethers'
import { poll } from 'ethers/utils/web'
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
          __typename: 'Transaction',
          id: txId,
          method,
          completed: false,
          sent: false,
          hash: '',
          error: '',
          blockNumber: null,
          args: newArgs
        }

        if (data.transactions) {
          data.transactions.push(newTx)
        } else {
          data.transactions = [newTx]
        }

        cache.writeQuery({ query, data })

        const gasLimit = await contract.estimate[method](...args)
        // Hack to ensure it works!
        const newGasLimit = gasLimit.add(3000)

        const id = `Transaction:${txId}`
        const readTx = () => {
          return cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
        }

        const transactionData = contract.interface.functions[method].encode(args)
        const unsignedTransaction = {
          data: transactionData,
          to: contract.address,
          gasLimit: newGasLimit
        }

        signer.sendUncheckedTransaction(unsignedTransaction)
          .then(async function (hash) {
            let transaction = readTx()
            let data = { ...transaction, hash, sent: true }
            cache.writeData({ id, data })
            transaction = readTx()

            const receipt = await poll(() => {
              return provider.getTransactionReceipt(hash).then(receipt => {
                if (receipt === null) { return undefined }
                return receipt
              })
            }, { onceBlock: provider }).catch(error => {
              console.warn(`Unable to get transaction receipt for tx with hash: ${hash}`, error)
              console.error(error)
              throw error
            })

            if (receipt.status === 0) {
              throw new Error(`Ethereum Transaction Receipt had a 0 status: ${receipt}`)
            }

            data = { ...transaction, blockNumber: receipt.blockNumber, completed: true }
            cache.writeData({ id, data })
          })
          .catch(error => {
            console.error(`Unknown error occured while sending transaction`, error)

            const transaction = readTx()
            const data = { ...transaction, args: newArgs, sent: true, completed: true, error: error.message }
            cache.writeData({ id, data })
          })

        return null
      }
    }
  }
}
