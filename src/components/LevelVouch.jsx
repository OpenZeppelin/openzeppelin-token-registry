import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ZepTokenLogo from '~/assets/images/zep-token-logo.svg'
import { displayNumber } from '~/utils/displayNumber'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'

export const LevelVouch = class _LevelVouch extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }

  render () {
    return (
      <nav className="level level--vouch is-size-6 truncate">
        <div className="level-left">
          <p className="level-item is-monospaced">
            <EtherscanAddressLink address={this.props.address}>{this.props.address}</EtherscanAddressLink>
          </p>
        </div>

        <div className="level-right">
          <p className="level-item">
            <ZepTokenLogo width='12' height='12' />&nbsp;{displayNumber(displayWeiToEther(this.props.amount))}
          </p>
        </div>
      </nav>
    )
  }
}
