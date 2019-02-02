import gql from 'graphql-tag'
import { ethers } from 'ethers'
import { tokenQueries } from '~/queries/tokenQueries'
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
  // query getAllTransactionsByPackageId($packageId: String!) {
  //   getAllTransactionsByPackageId(packageId: $packageId) @client {
  // This listens for Transfer (and mint) events for ZEP token balances
  const te = apolloClient.subscribe({
    query: gql`
      subscription($id: String!) {
        ZepToken @contract(id: $id) {
          ...token
        }
      }`
  }).subscribe(function ({ data: { ZepToken: { Transfer: { result, error } } }, err }) {
    if (error || err) {
      console.error(err)
      console.error(error)
    } else {
      console.log(result)
      const from = result.args[0]
      const to = result.args[1]
      const value = result.args[2]

      console.log(from, to, value.toString())

      // apolloClient.query({
      //   query: vouchingQueries.eventsQuery,
      //   fetchPolicy: 'network-only'
      // })
    }
  })
  console.log(te)

  // // This listens for the ZEP token balance for the current viewers Eth address
  // apolloClient.subscribe({
  //   query: tokenQueries.tokenQuery,
  //   fetchPolicy: 'network-only'
  // }).subscribe(function ({ data: { ZepToken: { myBalance: { _hex } } }, error }) {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     console.log(ethers.utils.bigNumberify(_hex).toString())
  //     // apolloClient.query({
  //     //   query: vouchingQueries.eventsQuery,
  //     //   fetchPolicy: 'network-only'
  //     // })
  //   }
  // })

  // This subscription listens for changes to a web3 browser (ie metamask's) network
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

  // This subscription watches for new and updated transactions for all packages
  apolloClient.watchQuery({
    query: transactionQueries.allTransactionsQuery,
    fetchPolicy: 'cache-only'
  }).subscribe((result, error) => {
    if (error) { console.warn('error!', error) }

    result.data.transactions.forEach((tx) => {
      // console.log('Running Apollo subscription queries for transactions with packageId: ', tx.packageId._hex)
      apolloClient.query({
        query: transactionQueries.getAllTransactionsByPackageId,
        variables: { packageId: tx.packageId },
        fetchPolicy: 'network-only'
      })
    })
  })
}
