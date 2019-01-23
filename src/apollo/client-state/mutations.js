import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'
import { abiMapping } from '~/apollo/abiMapping'
import { getMetamaskPermissions } from '~/web3/getMetamaskPermissions'

export default {
  resolvers: {
    Mutation: {
      sendTransaction: async (_, variables, { cache, getCacheKey }) => {
        const { method, args } = variables.web3Call
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

        contractMethod(...args).send({ from: currentAddress })

        return null
      }
    }
  }
}
