import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { web3Mutations } from '~/mutations/Web3Mutations'
import { toWei } from '~/utils/toWei'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'

export class VouchMutationForm extends Component {
  state = {
    web3Call: {
      method: 'vouch',
      args: [0, 0]
    }
  }

  handleAmountChange = (e) => {
    const amount = e.target.value.replace(new RegExp(/^-?![0-9]+/))
    const args = [
      this.props.packageId,
      toWei(amount)
    ]

    this.setState({ web3Call: { ...this.state.web3Call, args } })
  }

  render() {
    return (
      <Mutation mutation={web3Mutations.SEND_TRANSACTION} variables={{
        web3Call: this.state.web3Call
      }}>
        {sendTransaction => (
          <form onSubmit={(e) => {
            e.preventDefault()
            sendTransaction()
          }}>
            <div className='field has-addons is-right'>
              <div className='control'>
                <ZepTokenLogo width='40' height='40' className='field-addon--zep-token-logo' />
              </div>
              <div className='control'>
                <input
                  type='number'
                  placeholder='0'
                  className='input is-large'
                  onChange={this.handleAmountChange}
                />
              </div>
              <div className='control'>
                <button
                  className='button is-text no-scale'
                >
                  Vouch
                </button>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    )
  }
}
