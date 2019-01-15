import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ContractLink } from 'apollo-link-ethereum'
import { Web3JSResolver } from 'apollo-link-ethereum-resolver-web3js'
import { abiMapping } from './abiMapping'
import { getWeb3 } from '~/getWeb3'
import gql from 'graphql-tag'

const web3Resolver = new Web3JSResolver(abiMapping)
const contractLink = new ContractLink(web3Resolver)

const cache = new InMemoryCache({
  addTypename: false
})

const stateLink = withClientState({
  cache,
  resolvers: {},
  defaults: {
    networkId: 'unknown'
  }
})

const restLink = new RestLink({ uri: process.env.REACT_APP_METADATA_URI });

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([restLink, stateLink, contractLink]),
  defaults: {
    networkId: null
  }
})

getWeb3().then((web3) => {
  web3Resolver.web3 = web3
  client.resetStore()

  window.setInterval(async function () {
    const networkId = await web3.eth.net.getId()
    window.client = client

    let networkIdQuery

    try {
      networkIdQuery = cache.readQuery({
        query: gql`query networkIdQuery { networkId @client }`
      })
    } catch (error) {
      networkIdQuery = {}
    }

    if (networkId !== networkIdQuery.networkId) {
      client.writeData({ data: { networkId }})
    }
  }, 1000)
})
