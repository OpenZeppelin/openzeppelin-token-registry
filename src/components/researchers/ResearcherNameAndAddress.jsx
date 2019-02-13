import React, { Component } from 'react'
import { EnsName } from '~/components/EnsName'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'

export const ResearcherNameAndAddress = class _ResearcherNameAndAddress extends Component {
  render () {
    return (
      <>
        <h1 className='is-size-1'>
          <EnsName address={this.props.address} shorten />
        </h1>

        <EtherscanAddressLink
          address={this.props.address}
          className='has-hover-border'
        >
          {this.props.address}
        </EtherscanAddressLink>
      </>
    )
  }
}
