import React from 'react'
import { formatEtherscanAddressUrl } from '~/utils/formatEtherscanAddressUrl'
import { Query } from 'react-apollo'
import { web3Queries } from '~/queries/web3Queries'

export function EtherscanAddressLink ({ address, children, className }) {
  return (
    <Query query={web3Queries.networkIdQuery}>
      {({ data }) => {
        const url = formatEtherscanAddressUrl(address, data.networkId)
        return (
          <a href={url} className={className}>
            {children}
          </a>
        )
      }}
    </Query>
  )
}
