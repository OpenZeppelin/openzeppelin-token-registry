import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from '~/components/App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { getReadProvider } from '~/web3/getReadProvider'
import { subscribeAndRefetch } from '~/apollo/subscribeAndRefetch'
import { createClient } from '~/apollo/createClient'
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
    const client = await createClient(provider, defaultFromBlock)
    window.client = client
    subscribeAndRefetch(client)

    let coreApp =
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </ApolloProvider>

    ReactDOM.render(coreApp, document.getElementById('root'))
  } catch (error) {
    console.error(error)
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
