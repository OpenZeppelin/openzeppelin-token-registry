import gql from 'graphql-tag'
import { vouchingQueries } from '~/queries/vouchingQueries'
import * as queries from 'apollo-refetch-queries'

/**
 * Creates Apollo GraphQL subscriptions to watch for when smart contract data changes
 * and then re-runs specific queries (or executes various behaviour)
 * in response to those changes.
 *
 * @returns {undefined}
 */
export function subscribeWeb3 (apolloClient) {
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
      if (!result.args) {
        console.warn('no args')
        return
      }

      apolloClient.query({
        query: vouchingQueries.vouchQuery,
        variables: { id: result.args[0].toString() },
        fetchPolicy: 'network-only'
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
  }).subscribe(function ({ data: { Vouching: { Registered: { result, error } } } }) {
    if (error) {
      console.error(error)
    } else {
      apolloClient.query({
        query: vouchingQueries.registeredEventsQuery,
        fetchPolicy: 'network-only'
      })
    }
  })

  // This listens for the ZEP token balance for the current viewers Eth address
  apolloClient.subscribe({
    query: gql`
      subscription transferSubscription {
        ZepToken @contract {
          Transfer @events
        }
      }
    `
  }).subscribe(({ data, loading, error }) => {
    if (error) {
      console.error(error)
      return
    } else if (loading) {
      return
    }

    queries.refetchQueriesByName(apolloClient, ['tokenQuery'])
    queries.refetchQueriesByName(apolloClient, ['allowanceQuery'])
  })

  apolloClient.subscribe({
    query: gql`
      subscription allowanceSubscription {
        ZepToken @contract {
          Approval @events
        }
      }
    `
  }).subscribe((data, error) => {
    if (error) {
      console.error(error)
      return
    }

    queries.refetchQueriesByName(apolloClient, ['allowanceQuery', 'tokenQuery'])
  })
}
