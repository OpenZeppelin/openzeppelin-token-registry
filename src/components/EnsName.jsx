import React, { Component } from 'react'
import { getProvider } from '~/web3/getProvider'

export const EnsName = class _EnsName extends Component {
  state = {}

  resolveEnsName = async (provider) => {
    let value
    let address = this.props.address

    // test address w/ ens registered on ropsten & mainnet
    // address = '0x6fC21092DA55B392b045eD78F4732bff3C580e2c'
    value = await provider.lookupAddress(address)

    return value
  }

  async componentDidMount() {
    const provider = await getProvider()

    this.setState({
      value: this.props.address
    }, async () => {
      const result = await this.resolveEnsName(provider)

      if (result !== null) {
        this.setState({
          value: result
        })
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.value}
      </React.Fragment>
    )
  }
}
