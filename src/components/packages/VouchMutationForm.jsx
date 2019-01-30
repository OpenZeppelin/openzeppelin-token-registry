import React, { Component } from 'react'
import classnames from 'classnames'
import { Mutation, withApollo } from 'react-apollo'
import { Web3Mutations } from '~/mutations/Web3Mutations'
import { toWei } from '~/utils/toWei'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'

export const VouchMutationForm = withApollo(
  class _VouchMutationForm extends Component {
    state = {
      txData: {
        method: 'vouch',
        args: [0, 0]
      },
      ongoingTx: null
    }

    constructor(props) {
      super(props)

      this.textInputRef = React.createRef()
    }

    handleAmountChange = (e) => {
      const packageId = this.props.packageId

      let amount = e.target.value.replace(new RegExp(/^-?![0-9]+/))
      amount = toWei(amount)

      const args = [
        packageId,
        amount
      ]

      this.setState({ txData: { ...this.state.txData, args, packageId, amount } })
    }

    componentDidMount() {
      this.textInputRef.current.focus()
    }

    render() {
      const { hasUncompletedTransaction } = this.props
      return (
        <Mutation
          mutation={Web3Mutations.sendTransaction}
          variables={{
            txData: this.state.txData
          }}
        >
          {sendTransaction => (
            <form
              className={classnames(
                'form',
                {
                  'tx-in-progress': hasUncompletedTransaction
                }
              )}
              onSubmit={(e) => {
                e.preventDefault()
                sendTransaction()
              }}
            >
              <div className='field has-addons is-right'>
                <div className='control is-addons-form-height'>
                  <ZepTokenLogo
                    width='40'
                    height='40'
                    className='field-addon--zep-token-logo'
                  />
                </div>
                <div className='control is-addons-form-height'>
                  <input
                    disabled={hasUncompletedTransaction}
                    ref={this.textInputRef}
                    type='number'
                    placeholder='0'
                    className='input is-large'
                    onChange={this.handleAmountChange}
                  />
                </div>
                <div className='control is-addons-form-height'>
                  <button
                    className='button is-text no-scale'
                  >
                    {!hasUncompletedTransaction ? 'Vouch' : ''}
                  </button>
                </div>

              </div>
              <p className={
                classnames(
                  'help',
                  {
                    'has-text-link': hasUncompletedTransaction
                  }
                )
              }>
                {hasUncompletedTransaction ? 'Waiting for confirmation...' : <span>&nbsp;</span>}
              </p>
            </form>
          )}
        </Mutation>
      )
    }
  }
)
