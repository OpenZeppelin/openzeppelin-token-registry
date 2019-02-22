import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { EthereumLink } from 'apollo-link-ethereum'
import { EthersResolver } from 'apollo-link-ethereum-resolver-ethersjs'
import { abiMapping } from './abiMapping'
import { merge } from 'lodash'
import { metadataResolvers } from './client-state/metadataResolvers'
import { transactionResolvers } from './client-state/transactionResolvers'
import { web3Resolvers } from './client-state/web3Resolvers'
import { mutations } from './client-state/mutations'
import { subscribeAndRefetch } from '~/apollo/subscribeAndRefetch'
import { ethers } from 'ethers'

/**
 * Configures and returns the Apollo client using all of it's mutations,
 * resolvers and contract addresses
 *
 * @returns {Object}
 */
export const createClient = function (provider, defaultFromBlock) {
  window.provider = provider
  window.ethers = ethers

  const ethersResolver = new EthersResolver({
    abiMapping,
    provider,
    defaultFromBlock
  })
  const ethereumLink = new EthereumLink(ethersResolver)

  const cache = new InMemoryCache()

  const stateLink = withClientState({
    ...merge(
      {},
      metadataResolvers,
      transactionResolvers,
      web3Resolvers,
      mutations
    ),
    cache
  })

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, ethereumLink])
  })

  subscribeAndRefetch(client)
  window.client = client

  return client
}
