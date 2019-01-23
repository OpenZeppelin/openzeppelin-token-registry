import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'
import { displayNumber } from '~/utils/displayNumber'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { getInjectedWeb3 } from '~/web3/getInjectedWeb3'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'

export const LevelVouch = class _LevelVouch extends Component {
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
    return (
      <nav className='level level--vouch is-size-6 truncate'>
        <div className='level-left'>
          <p className='level-item is-monospaced'>
            <EtherscanAddressLink address={this.props.address}>{this.props.address}</EtherscanAddressLink>
          </p>
        </div>

        <div className='level-right'>
          <p className='level-item'>
            <ZepTokenLogo width='12' height='12' />&nbsp;{displayNumber(displayWeiToEther(this.props.amount))}
          </p>
        </div>

        <div className='level-right'>
          <p className='level-item'>
            {
              (this.currentAddress && (this.currentAddress.toLowerCase() === this.props.address))
                ? <span className="tag is-info">You</span>
                : null
            }
          </p>
        </div>
      </nav>
    )
  }
}
