import React from 'react'
import ReactTooltip from 'react-tooltip'
import AntdIcon from '@ant-design/icons-react'
import { ExportOutline } from '@ant-design/icons'
import { Query } from 'react-apollo'
import { web3Queries } from '~/queries/web3Queries'
import { formatEtherscanAddressUrl } from '~/utils/formatEtherscanAddressUrl'

export function EtherscanAddressLink ({ address, children, className }) {
  return (
    <Query query={web3Queries.networkIdQuery}>
      {({ data }) => {
        const url = formatEtherscanAddressUrl(address, data.networkId)
        return (
          <>
            <ReactTooltip type='info' effect='solid' />
            <a
              data-tip='View on Etherscan'
              href={url}
              className={className}
              target='_blank'
              rel='noopener noreferrer'
            >
              {children} <AntdIcon type={ExportOutline} className='export-icon' />
            </a>
          </>
        )
      }}
    </Query>
  )
}
