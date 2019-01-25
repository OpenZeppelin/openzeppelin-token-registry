import gql from 'graphql-tag'

export const VouchingQueries = {
  ChallengedEvents: gql`
    fragment ChallengedEvents on Vouching {
      Challenged @pastEvents(filter: {id: $id}, fromBlock: 0, toBlock: "latest")
    }
  `,
  Metadata: gql`
    fragment Metadata on Vouching {
      metadata(uri: $uri) @client {
        name
        version
        description
      }
    }
  `
}
