import { sendTransactionWithOptions } from 'apollo-link-ethereum-mutations-ethersjs'

import { abiMapping } from '~/apollo/abiMapping'
import { getWriteProvider } from '~/web3/getWriteProvider'

export const mutations = {
  resolvers: {
    Mutation: {
      sendTransaction: async function (rootData, args, context, info) {
        const provider = await getWriteProvider()
        const options = {
          provider,
          abiMapping
        }
        const fn = sendTransactionWithOptions(options)
        return fn(rootData, args, context, info)
      }
    }
  }
}
