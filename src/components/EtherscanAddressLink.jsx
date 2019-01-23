import React from 'react'
import { formatEtherscanAddressUrl } from '~/utils/formatEtherscanAddressUrl'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const networkQuery = gql`
  query networkQuery {
    networkId @client
  }
`

export function EtherscanAddressLink ({ address, children, className }) {
  return (
    <Query query={networkQuery}>
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
