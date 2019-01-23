import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'
import { displayNumber } from '~/utils/displayNumber'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'

export const VouchRow = class _VouchRow extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }

  async componentDidMount() {
    const accounts = await getInjectedWeb3().eth.getAccounts()
    this.currentAddress = accounts[0]
    console.log(this.currentAddress)
  }

  render () {
    const isUser = (this.currentAddress && (this.currentAddress.toLowerCase() === this.props.address))

    return (
      <li className={classnames(
        'list--row',
        'list--row_vouch',
        'truncate',
        {
          'is-active': isUser
        }
      )}>
        <span className='list--cell list__has-padding is-borderless is-monospaced break-words'>
          <EtherscanAddressLink address={this.props.address} className={classnames(
            'has-text-grey',
            {
              'has-text-primary': isUser
            }
          )}>
            {this.props.address}
          </EtherscanAddressLink>
        </span>

        <span className='list--cell list__has-padding is-borderless'>
          <ZepTokenLogo width='12' height='12' />&nbsp;{displayNumber(displayWeiToEther(this.props.amount))}
        </span>

        <span className='list--cell list__has-padding is-borderless'>
          {isUser ? <span className="tag has-arrow-left is-uppercase is-link">You</span> : null}
        </span>
      </li>
    )
  }
}
