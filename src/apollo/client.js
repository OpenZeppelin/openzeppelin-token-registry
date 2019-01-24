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
import { transactionResolvers } from './client-state/transactionResolvers'
import network from './client-state/network'
import metadata from './client-state/metadata'
import mutations from './client-state/mutations'
import web3js from './client-state/web3'

const typeDefs = `
  type Transaction {
    hash: ID!
    method: String!
    args: [String]
    packageId: String!
    amount: String!
  }

  type Query {
    transaction(hash: ID!): Transaction
    transactions: [Transaction]
  }
`

let web3 = getInjectedWeb3()
if (!web3) {
  web3 = getReadWeb3()
}

const web3Resolver = new Web3JSResolver(abiMapping, web3)
const contractLink = new ContractLink(web3Resolver)

const cache = new InMemoryCache({
  addTypename: false,
  dataIdFromObject: ({ __typename, id, _id, hash }) => {
    switch (__typename) {
      case 'Transaction': return __typename + ':' + hash // use `key` as the primary key
      // case 'bar': return object.blah; // use `blah` as the priamry key
      default: return id || _id || null // fall back to `id` and `_id` for all other types
    }
  }
})

const stateLink = withClientState({
  ...merge({}, transactionResolvers, network, metadata, mutations, web3js),
  cache,
  defaults: {
    // networkId: null
  },
  typeDefs
})

const restLink = new RestLink({ uri: process.env.REACT_APP_METADATA_URI })

export const client = new ApolloClient({
  cache,
  typeDefs,
  link: ApolloLink.from([restLink, stateLink, contractLink])/*,
  cacheRedirects: {
    Query: {
      transaction: (_, { id }, { getCacheKey }) => getCacheKey({ id, __typename: 'Transaction' }),
      transactions: (_, args, { getCacheKey }) =>
        args.ids.map(id =>
          getCacheKey({ __typename: 'Transaction', id: id }))
    }
  } */
})

window.client = client
