import gql from 'graphql-tag'

export const web3Queries = {
  networkIdQuery: gql`
    query networkIdQuery {
      networkId @client
    }
  `,
  accountQuery: gql`
    query accountQuery {
      account @client
    }
  `,
  networkAccountQuery: gql`
    query networkAccountQuery {
      networkId @client
      account @client
    }
  `,
  blockSubscription: gql`
    subscription blockSubscription {
      block @block
    }
  `
}
