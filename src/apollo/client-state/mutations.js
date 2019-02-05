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

        const newTx = {
          error: '',
          completed: false,
          hash: '',
          id: txId,
          packageId: args[0].toString(),
          __typename: 'Transaction',
          type: 'Transaction'
        }

        if (data.transactions) {
          data.transactions.push(newTx)
        } else {
          data.transactions = [newTx]
        }

        cache.writeQuery({ query, data })

        // Hack to ensure it works!
        const gasLimit = await contract.estimate[method](...args)
        const newGasLimit = gasLimit.add(3000)

        // const transactionData = contract.interface.functions[method].encode(args)
        // const unsignedTransaction = {
        //   data: transactionData,
        //   to: contract.address,
        //   gasLimit: newGasLimit
        // }
        //
        // let signedTransaction
        // try {
        //   const populatedTransaction = await ethers.utils.populateTransaction(unsignedTransaction, provider, '0x7A8cda94b311F58291d6F9E681599c915E31c338')
        //   // console.log('populatedTransaction', populatedTransaction)
        //   const serializedTransaction = await ethers.utils.serializeTransaction(populatedTransaction)
        //   // console.log('serializedTransaction', serializedTransaction)
        //   // signedTransaction = await provider.send(serializedTransaction)
        //
        //   const id = `Transaction:${txId}`
        //   const transaction = cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
        //   const data = { ...transaction, completed: true }
        //
        //   cache.writeData({ id, data })
        // } catch (error) {
        //   console.error(`Mutation sendTransaction error: ${error}`)
        //   const id = `Transaction:${txId}`
        //   const transaction = cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
        //   const data = { ...transaction, completed: true, error: error.message }
        //   cache.writeData({ id, data })
        //
        //   return
        // }

        methodFxn(...args.concat([{ gasLimit: newGasLimit }]))
        // provider.sendTransaction(signedTransaction)
          .then(async function (event) {
            const receipt = await provider.getTransactionReceipt(event.hash)
            console.log('receipt', receipt)
            const error = (receipt.status === 0)
            const id = `Transaction:${txId}`
            const transaction = cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
            // const data = { ...transaction, hash: event.hash, error }
            const data = { ...transaction, hash: event.hash, error, completed: true }
            cache.writeData({ id, data })

            return data
          })
          .catch(error => {
            // if (error.message === 'Error: MetaMask Tx Signature: User denied transaction signature.') { return }
            const id = `Transaction:${txId}`
            const transaction = cache.readFragment({ fragment: transactionQueries.transactionFragment, id })
            // const data = { ...transaction, error: error.message }
            const data = { ...transaction, error: error.message, completed: true }
            // console.log('newdata', data)
            cache.writeData({ id, data })

            return data
          })

        return null
      }
    }
  }
}
