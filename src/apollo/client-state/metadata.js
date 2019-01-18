/* eslint-env worker */

export default {
  resolvers: {
    Query: {
      metadata: async function (data, args, options, info) {
        const { uri, format } = args
        if (!uri) { throw new Error('You must pass a URI') }

        return fetch(uri, {
          method: 'GET'
        }).then(async (response) => {
          if (format === 'text') {
            return response.text()
          } else {
            return response.json()
          }
        }).catch(error => {
          return {
            error
          }
        })
      }
    }
  }
}
