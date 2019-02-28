import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from '~/components/App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { getReadProvider } from '~/web3/getReadProvider'
import { createClient } from '~/apollo/createClient'
import { isValidNetwork } from '~/web3/isValidNetwork'
import { subscribeClientState } from '~/apollo/subscribeClientState'
import { subscribeWeb3 } from '~/apollo/subscribeWeb3'
import './index.scss'

require('./ethers.extension')

if (process.env.REACT_APP_INTERCOM_APP_ID) {
  require('./intercom')

  window.Intercom('boot', {
    app_id: process.env.REACT_APP_INTERCOM_APP_ID
  })
}

window.addEventListener('load', async () => {
  try {
    const provider = await getReadProvider()
    const network = await provider.getNetwork()
    let defaultFromBlock = 0
    if (network.chainId === 1) {
      defaultFromBlock = parseInt(process.env.REACT_APP_MAINNET_STARTING_BLOCK, 10)
    }

    const validNetwork = isValidNetwork(network.chainId)

    const client = await createClient(provider, defaultFromBlock)
    subscribeClientState(client)

    let coreApp =
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </ApolloProvider>

    if (validNetwork) {
      subscribeWeb3(client)
    }

    ReactDOM.render(coreApp, document.getElementById('root'))
  } catch (error) {
    console.error(error)
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
