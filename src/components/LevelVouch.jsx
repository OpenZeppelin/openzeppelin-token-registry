import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ZepTokenLogo from '~/assets/images/zep-token-logo.svg'
import { displayNumber } from '~/utils/displayNumber'

export const LevelVouch = class _LevelVouch extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }

  render () {
    return (
      <nav class="level level--vouch is-size-6">
        <div class="level-left">
          <p class="level-item is-monospaced">
            {this.props.address}
          </p>
        </div>

        <div class="level-right">
          <p class="level-item">
            <ZepTokenLogo width='12' height='12' />&nbsp;{displayNumber(this.props.amount)}
          </p>
        </div>
      </nav>
    )
  }
}
