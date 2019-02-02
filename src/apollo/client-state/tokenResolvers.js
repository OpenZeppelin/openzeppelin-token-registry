import { getProvider } from '~/web3/getProvider'

export const tokenResolvers = {
  resolvers: {
    Query: {
      tokenQuery: async function (object, args, context, info) {
        console.log('run')
        console.log(args)

        return null
      }
    }
  }
}
