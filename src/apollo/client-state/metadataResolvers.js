/* eslint-env worker */

export const metadataResolvers = {
  resolvers: {
    Query: {
      metadata: async function (object, args, options, info) {
        const { uri, format } = args
        if (!uri) { throw new Error('You must pass a URI') }

        return fetch(uri, {
          method: 'GET'
        }).then(async (response) => {
          if (format === 'text') {
            return response.text()
          } else {
            const json = await response.json()
            json.__typename = 'Metadata'
            return json
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
