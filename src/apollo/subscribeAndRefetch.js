import gql from 'graphql-tag'
import { transactionQueries } from '~/queries/transactionQueries'
import { vouchingQueries } from '~/queries/vouchingQueries'

export function subscribeAndRefetch (apolloClient) {
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
        query: vouchingQueries.eventsQuery,
        fetchPolicy: 'network-only'
      })
    }
  })

  let firstLoad = true
  apolloClient.watchQuery({
    query: gql`
      query {
        networkId @client
      }
    `,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe((data) => {
    if (firstLoad) {
      firstLoad = false
    } else {
      window.location.reload()
    }
  })

  apolloClient.watchQuery({
    query: transactionQueries.allTransactionsQuery,
    fetchPolicy: 'cache-only'
  }).subscribe((result, error) => {
    if (error) { console.warn('error!', error) }

    result.data.transactions.forEach((tx) => {
      // console.log('Running Apollo subscription queries for transactions with packageId: ', tx.packageId._hex)
      apolloClient.query({
        query: transactionQueries.getUncompletedTransactionsByPackageId,
        variables: { packageId: tx.packageId },
        fetchPolicy: 'network-only'
      })
    })
  })
}
