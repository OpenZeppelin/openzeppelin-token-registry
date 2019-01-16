import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'

export default {
  resolvers: {
    Query: {
      metadata: async function (data, args, options, info) {
        const { uri } = args
        if (!uri) { throw new Error('You must pass a URI') }

        return fetch(uri, { method: 'GET' }).then(response => {
          return response.json()
        }).catch(error => {
          return {
            error
          }
        })
      }
    }
  }
}
