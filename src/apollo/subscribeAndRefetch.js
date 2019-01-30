import gql from 'graphql-tag'
import { vouchingQueries } from '~/queries/vouchingQueries'

export function subscribeAndRefetch(apolloClient) {

  // The following subscription listens for new vouches
  apolloClient.subscribe({
    query: gql`
      subscription {
        Vouching @contract {
          Vouched @events
        }
      }
    `
  }).subscribe(function ({ data: { Vouching: { Vouched: { result, error } } } }) {
    if (error) {
      console.error(error)
    } else {
      apolloClient.query({
        query: vouchingQueries.vouchQuery,
        variables: { id: result.args[0].toString() },
        fetchPolicy: "network-only"
      })
    }
  })

  // The following subscription listens for new packages
  apolloClient.subscribe({
    query: gql`
      subscription {
        Vouching @contract {
          Registered @events
        }
      }`
  }).subscribe(function ({ data: { Vouching: { Registered: { result, error }}}}) {
    if (error) {
      console.error(error)
    } else {
      apolloClient.query({
        query: vouchingQueries.eventsQuery,
        fetchPolicy: "network-only"
      })
    }
  })
}
