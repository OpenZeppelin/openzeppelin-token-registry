import React from 'react'
import { Query } from 'react-apollo'
import { web3Queries } from '~/queries/web3Queries'
import { formatEtherscanAddressUrl } from '~/utils/formatEtherscanAddressUrl'

export function EtherscanAddressLink ({ address, children, className }) {
  return (
    <Query query={web3Queries.networkIdQuery}>
      {({ data }) => {
        const url = formatEtherscanAddressUrl(address, data.networkId)
        return (
          <a
            href={url}
            className={className}
            target='_blank'
            rel='noopener noreferrer'
          >
            {children}
          </a>
        )
      }}
    </Query>
  )
}
