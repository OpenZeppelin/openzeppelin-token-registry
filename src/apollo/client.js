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
import networkId from './client-state/networkId'
import metadata from './client-state/metadata'
import web3js from './client-state/web3'

let web3 = getInjectedWeb3()
if (!web3) {
  web3 = getReadWeb3()
}

window.web3 = web3
window.vouching = new window.web3.eth.Contract(abiMapping.getAbi('Vouching'), abiMapping.getAddress('Vouching', 1234))
// window.vouching2 = new window.web3.eth.Contract(abiMapping.getAbi('Vouching'), abiMapping.getAddress('Vouching', 1234))

// function setupFakers() {
//   console.log('setting...............')
//
  // window.vouching.events.Test({ fromBlock: 'latest' })
  // window.vouching.events.Test({ fromBlock: 'latest' })
  // window.vouching.events.Test2({ fromBlock: 'latest' })
  // window.vouching.events.Test2({ fromBlock: 'latest' })
// }
//
// window.setTimeout(setupFakers.bind(window), 10000)


const web3Resolver = new Web3JSResolver(abiMapping, web3)
const contractLink = new ContractLink(web3Resolver)

const cache = new InMemoryCache({
  addTypename: false
})

const stateLink = withClientState({
  ...merge({}, networkId, metadata, web3js), // can put more resolvers in here
  cache
})

const restLink = new RestLink({ uri: process.env.REACT_APP_METADATA_URI })

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([restLink, stateLink, contractLink]),
  defaults: {
    networkId: null
  }
})


window.client = client
