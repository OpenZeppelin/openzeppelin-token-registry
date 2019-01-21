import { client } from '~/apollo/client'
import gql from 'graphql-tag'

const blockQuery = gql`
  query blockQuery {
    block(numberOrHash: "latest", includeTransactions: true) @client
  }
`

export const blockObserver = client.watchQuery({
  query: blockQuery,
  pollInterval: 2000
})
