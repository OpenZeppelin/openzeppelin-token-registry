import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { EthereumLink } from 'apollo-link-ethereum'
import { EthersResolver } from 'apollo-link-ethereum-resolver-ethersjs'
import { abiMapping } from './abiMapping'
import { getProvider } from '~/web3/getProvider'
import { merge } from 'lodash'
import { metadataResolvers } from './client-state/metadataResolvers'
import { transactionResolvers } from './client-state/transactionResolvers'
import { web3Resolvers } from './client-state/web3Resolvers'
import { mutations } from './client-state/mutations'

let ethers = getProvider()
window.ethers = ethers

const ethersResolver = new EthersResolver(abiMapping, ethers)
const ethereumLink = new EthereumLink(ethersResolver)

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
  typeDefs: `
    type Metadata {
      name: String
      description: String
      version: String
      metadata(id: String!): Metadata
    }

    type Transaction {
      hash: ID!
      method: String
      args: [String]
      packageId: String
      amount: String
      completed: String
    }

    type Event {
    }

    type Vouching {
      allEvents: [Event]
      Challenged: [Event]
      Registered: [Event]
      totalVouched(id: String!)
    }

    type Block {
    }

    type Query {
      networkId: String
      account: String
      getUncompletedTransactionsByPackageId: [Transaction]
      metadata: Metadata
      transactions: [Transaction]
      block: Block
    }
  `
})

if (!process.env.REACT_APP_METADATA_URI) {
  throw new Error('The "REACT_APP_METADATA_URI" env var is not set (need to direnv allow?)')
}
const restLink = new RestLink({ uri: process.env.REACT_APP_METADATA_URI })

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([restLink, stateLink, ethereumLink])
})

window.client = client
