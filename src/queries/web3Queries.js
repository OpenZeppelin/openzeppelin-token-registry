import gql from 'graphql-tag'

export const web3Queries = {
  networkIdQuery: gql`
    query networkIdQuery {
      networkId @client
    }
  `
}
