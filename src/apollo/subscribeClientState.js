import { web3Queries } from '~/queries/web3Queries'

/**
 * Creates Apollo GraphQL subscriptions to watch for when data changes
 * and then re-runs specific queries (or executes various behaviour)
 * in response to those changes.
 *
 * @returns {undefined}
 */
export function subscribeClientState (apolloClient) {
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
}
