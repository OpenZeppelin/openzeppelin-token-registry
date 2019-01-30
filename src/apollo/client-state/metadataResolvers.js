/* eslint-env worker */

export const metadataResolvers = {
  resolvers: {
    Query: {
      metadata: async function (object, args, options, info) {
        const { uri } = args
        if (!uri) { throw new Error('You must pass a URI') }

        return fetch(uri, {
          method: 'GET'
        }).then(async (response) => {
          const json = await response.json()
          json.__typename = 'Metadata'
          json.id = uri
          return json
        }).catch(error => {
          return {
            error,
            __typename: 'Metadata'
          }
        })
      }
    }
  }
}
