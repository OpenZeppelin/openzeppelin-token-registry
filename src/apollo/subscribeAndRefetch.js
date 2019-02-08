import gql from 'graphql-tag'
import { tokenQueries } from '~/queries/tokenQueries'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { web3Queries } from '~/queries/web3Queries'
import { abiMapping } from '~/apollo/abiMapping'

export function subscribeAndRefetch (apolloClient) {
  // If the user signs in to MetaMask or logs out, we should ... (refresh the page?)
  let firstLoadAccount = true
  apolloClient.watchQuery({
    query: web3Queries.accountQuery,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe((data) => {
    if (firstLoadAccount) {
      firstLoadAccount = false
    } else {
      window.location.reload()
    }
  })

  // This subscription listens for changes to a web3 browser (ie metamask's) network
  let firstLoadNetwork = true
  apolloClient.watchQuery({
    query: web3Queries.networkIdQuery,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe((data) => {
    if (firstLoadNetwork) {
      firstLoadNetwork = false
    } else {
      window.location.reload()
    }
  })

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

  // This listens for the ZEP token balance for the current viewers Eth address
  apolloClient.subscribe({
    query: gql`
      subscription transferSubscription {
        ZepToken @contract {
          Transfer @events
        }
      }
    `
  }).subscribe((data, error) => {
    if (error) {
      console.error(error)
      return
    }

    const accountResult = apolloClient.readQuery({ query: web3Queries.accountQuery })

    if (accountResult && accountResult.account) {
      apolloClient.query({
        query: tokenQueries.tokenQuery,
        variables: { address: accountResult.account },
        fetchPolicy: 'network-only'
      })
    }
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

    const accountResult = apolloClient.readQuery({ query: web3Queries.networkAccountQuery })

    if (accountResult && accountResult.account && accountResult.networkId) {
      apolloClient.query({
        query: tokenQueries.allowanceQuery,
        variables: {
          address: accountResult.account,
          spender: abiMapping.getAddress('Vouching', accountResult.networkId)
        },
        fetchPolicy: 'network-only'
      })
    }
  })
}
