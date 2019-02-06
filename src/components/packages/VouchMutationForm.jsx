import React, { Component } from 'react'
import classnames from 'classnames'
import AntdIcon from '@ant-design/icons-react'
import { ExclamationCircleOutline } from '@ant-design/icons'
import { Mutation, Query, graphql, withApollo } from 'react-apollo'
import { Web3Mutations } from '~/mutations/Web3Mutations'
import { tokenQueries } from '~/queries/tokenQueries'
import { web3Queries } from '~/queries/web3Queries'
import { toWei } from '~/utils/toWei'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'

export const VouchMutationForm = graphql(web3Queries.accountQuery)(
  withApollo(
    class _VouchMutationForm extends Component {
      state = {
        txData: {
          method: 'vouch'
        },
        txCompleted: false,
        txError: false,
        amountError: false
      }

      constructor (props) {
        super(props)

        this.stateDefaults = this.state

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

        this.setState({
          txData: { ...this.state.txData, args, packageId, amount },
          amountError: false
        })
      }

      componentDidMount () {
        this.focusOnInput()
      }

      componentDidUpdate (prevProps) {
        if (this.props.hasUncompletedTransaction !== prevProps.hasUncompletedTransaction) {
          if (!this.props.hasUncompletedTransaction) {
            this.setState({ txCompleted: true })
          }
        }

        if (this.props.mostRecentTxHasError !== prevProps.mostRecentTxHasError) {
          if (this.props.mostRecentTxHasError) {
            this.setState({ txError: true })
          }
        }
      }

      focusOnInput = () => {
        this.textInputRef.current.focus()
      }

      helpText = (notEnoughZepError) => {
        let text = ''

        if (this.needsWeb3()) {
          text = `You will need to`
        } else if (notEnoughZepError) {
          text = `You don't have enough ZEP tokens`
        } else if (this.state.amountError) {
          text = 'Please enter an amount'
        } else if (this.state.txError) {
          text = 'Vouching was not completed'
        } else if (this.state.txCompleted) {
          text = 'Vouching completed'
        } else if (this.props.hasSentTransaction) {
          text = 'Waiting for confirmations...'
        } else if (this.props.hasUncompletedTransaction) {
          text = 'Waiting to receive transaction...'
        }

        return text
      }

      buttonText = () => {
        let text = 'Vouch'

        if (this.state.txError) {
          text = 'Retry'
        } else if (this.state.txCompleted) {
          text = 'Done'
        } else if (this.props.hasUncompletedTransaction) {
          text = ''
        }

        return text
      }

      resetForm = () => {
        this.setState(this.stateDefaults)
        this.textInputRef.current.value = ''
      }

      handleSubmit = (sendTransaction) => {
        if (this.state.txError) {
          this.resetForm()
          this.focusOnInput()
        } else if (this.state.txCompleted) {
          this.resetForm()
        } else if (
          this.state.txData.amount &&
          this.state.txData.packageId &&
          this.state.txData.args
        ) {
          // run the mutation resolver
          sendTransaction()
        } else {
          this.setState({ amountError: true })
        }
      }

      needsWeb3 = () => {
        const { systemInfo } = this.props
        return systemInfo && !systemInfo.hasWeb3Available
      }

      needsIOSWeb3 = () => {
        const { systemInfo } = this.props
        return systemInfo && systemInfo.mobileOS === 'iOS'
      }

      needsAndroidWeb3 = () => {
        const { systemInfo } = this.props
        return systemInfo && systemInfo.mobileOS === 'Android'
      }

      downloadText = () => {
        if (this.needsIOSWeb3()) {
          return 'Download Coinbase Wallet'
        } else if (this.needsAndroidWeb3()) {
          return 'Download Opera'
        } else {
          return 'Download MetaMask'
        }
      }

      downloadUrl = () => {
        if (this.needsIOSWeb3()) {
          return 'https://itunes.apple.com/us/app/coinbase-wallet/id1278383455'
        } else if (this.needsAndroidWeb3()) {
          return 'https://play.google.com/store/apps/details?id=com.opera.browser'
        } else {
          return 'https://metamask.io/'
        }
      }

      downloadLink = () => {
        return this.needsWeb3() &&
          <a
            href={this.downloadUrl()}
            target='_blank'
            rel='noopener noreferrer'
            className='has-text-link'
          >{this.downloadText()}</a>
      }

      render () {
        const { hasUncompletedTransaction } = this.props

        return (
          <Query query={tokenQueries.tokenQuery} variables={{ address: this.props.data.account }} skip={!this.props.data.account}>
            {({ data }) => {
              let notEnoughZepError = false

              if (data && data.ZepToken) {
                notEnoughZepError = parseInt(this.state.txData.amount, 10) > parseInt(data.ZepToken.myBalance)
              }

              return <Mutation
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
                        'tx-in-progress': hasUncompletedTransaction,
                        'is-warning': this.needsWeb3(),
                        'is-danger': this.state.amountError || this.state.txError || notEnoughZepError,
                        'is-success': this.state.txCompleted && !this.state.txError
                      }
                    )}
                    onSubmit={(e) => {
                      e.preventDefault()

                      this.handleSubmit(sendTransaction)
                    }}
                  >
                    <div className='field has-addons is-right'>
                      <div className='control is-addons-form-height'>
                        {this.state.txError || notEnoughZepError
                          ? (
                            <AntdIcon
                              type={ExclamationCircleOutline}
                              className='field-addon--error-exclamation field-addon--icon'
                            />
                          )
                          : (
                            <ZepTokenLogo
                              width='40'
                              height='40'
                              className='field-addon--zep-token-logo field-addon--icon'
                            />
                          )
                        }
                      </div>
                      <div className='control is-addons-form-height'>
                        <input
                          disabled={hasUncompletedTransaction || this.state.txCompleted || this.state.txError}
                          ref={this.textInputRef}
                          type='number'
                          placeholder='0'
                          className='input is-large'
                          onChange={this.handleAmountChange}
                        />
                      </div>
                      <div className='control is-addons-form-height'>
                        <button
                          disabled={notEnoughZepError || hasUncompletedTransaction}
                          className='button is-text no-scale'
                        >
                          {this.buttonText()}
                        </button>
                      </div>
                    </div>
                    <p className={
                      classnames(
                        'help is-size-6',
                        {
                          'has-text-success': this.state.txCompleted && !this.state.txError,
                          'has-text-link': hasUncompletedTransaction,
                          'has-text-warning': this.needsWeb3(),
                          'has-text-danger': this.state.amountError || this.state.txError || notEnoughZepError
                        }
                      )
                    }>
                      {this.helpText(notEnoughZepError) || '\u00A0'} {this.downloadLink()}
                    </p>
                  </form>
                )}
              </Mutation>
            }}
          </Query>
        )
      }
    }
  )
)
