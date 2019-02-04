import { web3Resolvers } from '~/apollo/client-state/web3Resolvers'
import { tokenQueries } from '~/queries/tokenQueries'

export const tokenResolvers = {
  resolvers: {
    Query: {
      zepTokenBalance: async function (object, args, context, info) {
        const address = await web3Resolvers.resolvers.Query.account()

        return context.cache.readQuery({
          query: tokenQueries.tokenQuery,
          variables: { address }
        })
      }
    }
  }
}
