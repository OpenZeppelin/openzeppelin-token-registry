import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { ResearcherLink } from '~/components/ResearcherLink'
import { web3Queries } from '~/queries/web3Queries'
import { graphql } from 'react-apollo'

export const VouchRow = graphql(web3Queries.accountQuery)(class _VouchRow extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }

  render () {
    const { account } = this.props.data || {}
    const currentAddress = account || ''

    const isUser = (currentAddress && (currentAddress.toLowerCase() === this.props.address))

    return (
      <li className={classnames(
        'list--row',
        'list--row__three-column',
        'truncate',
        {
          'is-active': isUser
        }
      )}>
        <span className='list--cell list__has-padding is-borderless is-monospaced break-words'>
          <ResearcherLink
            address={this.props.address}
            className={classnames(
              'has-hover-border',
              'has-text-grey',
              {
                'has-text-primary': isUser
              }
            )} />
        </span>

        <span className='list--cell list__has-padding is-borderless'>
          <ZepTokenLogo width='12' height='12' />&nbsp;{displayWeiToEther(this.props.amount)}
        </span>

        <span className='list--cell list__has-padding is-borderless'>
          {isUser ? <span className='tag has-arrow-left is-uppercase is-link'>You</span> : null}
        </span>
      </li>
    )
  }
})
