import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'
import { ethers } from 'ethers'
// import { transactionQueries } from '~/queries/transactionQueries'

export const mutations = {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache, getCacheKey }) => {
        const { method, args } = variables.txData

        await getMetamaskPermissions()
        console.log('hhi')
        console.log(window.ethereum === window.web3.currentProvider)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log('provider', provider)

        const network = await provider.getNetwork()
        const networkId = network.chainId

        const signer = await provider.getSigner()

        const abi = abiMapping.getAbi('Vouching')
        const contractAddress = abiMapping.getAddress('Vouching', networkId)
        console.log(contractAddress)
        const contract = new ethers.Contract(contractAddress, abi, signer)
        console.log(contract)
        // const contractMethod = contract[method]
        // console.log('contractMethod', contractMethod)

        // if (!contractMethod) {
        //   console.error(`Address ${contractAddress} does not have method '${method}'`)
        //   return
        // }

        // const result = contractMethod(...args)
        // const gasCost = await contract.estimate[method](...args)
        // console.log(...args)
        contract[method](...args).then(res => console.log(res))

        const result = await contract[method](...args)
        // console.log(result)
        // const result = await contract[method](...args.concat([{ gasLimit: gasCost.add(2000) }]))

        console.log('Result: ', result)

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
