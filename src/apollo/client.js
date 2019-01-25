import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ContractLink } from 'apollo-link-ethereum'
import { Web3JSResolver } from 'apollo-link-ethereum-resolver-web3js'
import { abiMapping } from './abiMapping'
import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'
import { getReadWeb3 } from '~/web3/getReadWeb3'
import { merge } from 'lodash'

import { metadataResolvers } from './client-state/metadataResolvers'
import { transactionResolvers } from './client-state/transactionResolvers'
import { web3Resolvers } from './client-state/web3Resolvers'

import { mutations } from './client-state/mutations'

let web3 = getInjectedWeb3()
if (!web3) {
  web3 = getReadWeb3()
}

const web3Resolver = new Web3JSResolver(abiMapping, web3)
const contractLink = new ContractLink(web3Resolver)

const cache = new InMemoryCache({
  addTypename: false
})

const stateLink = withClientState({
  ...merge(
    {},
    metadataResolvers,
    transactionResolvers,
    web3Resolvers,
    mutations
  ),
  cache,
  defaults: {
    // networkId: null
  }
})

if (!process.env.REACT_APP_METADATA_URI) {
  throw new Error('The "REACT_APP_METADATA_URI" env var is not set (need to direnv allow?)')
}
const restLink = new RestLink({ uri: process.env.REACT_APP_METADATA_URI })

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([restLink, stateLink, contractLink])
})

window.client = client
