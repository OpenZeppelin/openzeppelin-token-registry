import React, { Component } from 'react'
import classnames from 'classnames'
import AntdIcon from '@ant-design/icons-react'
import { ExclamationCircleOutline } from '@ant-design/icons'
import { graphql } from 'react-apollo'
import { Web3Mutations } from '~/mutations/Web3Mutations'
import { tokenFragments } from '~/queries/tokenQueries'
import { web3Queries } from '~/queries/web3Queries'
import { toWei } from '~/utils/toWei'
import { bigNumberify } from '~/utils/bigNumberify'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'
import { abiMapping } from '~/apollo/abiMapping'
import { ethers } from 'ethers'
import gql from 'graphql-tag'

const tokenQuery = gql`
  query tokenQuery($address: String!, $spender: String!) {
    ZepToken @contract {
      ...tokenFragment
      ...allowanceFragment
    }
  }
  ${tokenFragments.tokenFragment}
  ${tokenFragments.allowanceFragment}
`

export const VouchMutationForm = graphql(Web3Mutations.sendTransaction, { name: 'sendTransaction' })(
  graphql(web3Queries.networkAccountQuery, { name: 'networkAccount' })(
    graphql(
      tokenQuery,
      {
        name: 'token',
        skip: (props) => !props.networkAccount.account || !props.networkAccount.networkId,
        options: (props) => ({
          variables: {
            address: props.networkAccount.account,
            spender: abiMapping.getAddress('Vouching', props.networkAccount.networkId)
          }
        })
      }
    )(
      class _VouchMutationForm extends Component {
        state = {
          lastTransactionId: null,
          inputAmount: '',
          amountError: false
        }

        constructor (props) {
          super(props)
          this.textInputRef = React.createRef()
          const { vouchTx, approveTx } = props

          // If still on the fly, setup component
          let lastTransactionId = null
          let inputAmount = ''
          if (vouchTx && !vouchTx.completed) {
            lastTransactionId = vouchTx.id
            inputAmount = ethers.utils.formatEther(vouchTx.args.values[1].toString())
          } else if (approveTx && !approveTx.completed) {
            lastTransactionId = approveTx.id
            inputAmount = ethers.utils.formatEther(approveTx.args.values[1].toString())
          }

          this.state = {
            inputAmount,
            lastTransactionId
          }
        }

        handleAmountChange = (e) => {
          let inputAmount = e.target.value.replace(new RegExp(/^-?![0-9]+/))

          this.setState({
            amountError: false,
            inputAmount
          })
        }

        componentDidMount () {
          this.focusOnInput()
        }

        focusOnInput = () => {
          if (this.textInputRef.current) {
            this.textInputRef.current.focus()
          }
        }

        hasSentTransaction () {
          return this.hasSentVouchTx() || this.hasSentApproveTx()
        }

        hasSentVouchTx () {
          return this.vouchTxMatches() && this.props.vouchTx.sent && !this.props.vouchTx.completed
        }

        hasSentApproveTx () {
          return this.approveTxMatches() && this.props.approveTx.sent && !this.props.approveTx.completed
        }

        vouchTxMatches () {
          const vouchTx = this.props.vouchTx
          return vouchTx && vouchTx.id === this.state.lastTransactionId
        }

        vouchingTxError () {
          return this.vouchTxMatches() && !!this.props.vouchTx.error
        }

        vouchingTxCompleted () {
          return this.vouchTxMatches() && this.props.vouchTx.completed
        }

        approveTxMatches () {
          const approveTx = this.props.approveTx
          return approveTx && approveTx.id === this.state.lastTransactionId
        }

        approveTxError () {
          return this.approveTxMatches() && !!this.props.approveTx.error
        }

        approveTxCompleted () {
          return this.approveTxMatches() && this.props.approveTx.completed
        }

        approveTxSuccess () {
          return this.approveTxCompleted() && !this.approveTxError()
        }

        helpText = () => {
          let text = ''

          if (this.needsWeb3()) {
            text = `You will need to`
          } else if (this.hasSentTransaction()) {
            text = 'Waiting for confirmation...'
          } else if (this.vouchingTxError()) {
            text = 'Vouching was not completed'
          } else if (this.vouchingTxCompleted()) {
            text = 'Vouching completed'
          } else if (this.hasUncompletedTransaction()) {
            text = 'Waiting to receive transaction...'
          } else if (this.approveTxError()) {
            text = 'Approval was not completed'
          } else if (this.approveTxCompleted()) {
            text = 'Approval completed.  You may now vouch'
          } else if (this.notLoggedIn()) {
            text = `You need to login to MetaMask`
          } else if (this.notEnoughZepError()) {
            text = `You don't have enough ZEP tokens`
          } else if (this.notEnoughAllowance()) {
            text = `You must first approve ${displayWeiToEther(this.vouchAmount())} tokens`
          } else if (this.state.amountError) {
            text = 'Please enter an amount'
          }

          return text
        }

        buttonText = () => {
          let text = 'Vouch'

          if (this.vouchingTxError()) {
            text = 'Retry'
          } else if (this.vouchingTxCompleted()) {
            text = 'Done'
          } else if (this.notEnoughZepError()) {
            text = 'Vouch'
          } else if (this.notEnoughAllowance() && !this.approveTxSuccess()) {
            text = 'Approve'
          }

          return text
        }

        isWarning () {
          return this.needsWeb3() && !this.hasUncompletedTransaction()
        }

        isDanger () {
          return this.state.amountError || this.vouchingTxError() || this.approveTxError() || this.notEnoughZepError() || this.notLoggedIn()
        }

        isSuccess () {
          return (this.vouchingTxCompleted() && !this.vouchingTxError()) ||
                 (this.approveTxCompleted() && !this.approveTxError())
        }

        isInputDisabled () {
          return this.hasUncompletedTransaction() || this.notLoggedIn()
        }

        isButtonDisabled () {
          return this.hasUncompletedTransaction() || this.notLoggedIn()
        }

        formClassName () {
          var className = ''

          if (this.hasUncompletedTransaction()) {
            className = 'tx-in-progress'
          } else if (this.isWarning()) {
            className = 'is-warning'
          } else if (this.isDanger()) {
            className = 'is-danger'
          } else if (this.isSuccess()) {
            className = 'is-success'
          }

          return className
        }

        helpClassName () {
          var className = ''

          if (this.hasUncompletedTransaction()) {
            className = 'has-text-link'
          } else if (this.isWarning()) {
            className = 'has-text-warning'
          } else if (this.isDanger()) {
            className = 'has-text-danger'
          } else if (this.isSuccess()) {
            className = 'has-text-success'
          }

          return className
        }

        resetForm = () => {
          this.setState({
            lastTransactionId: null,
            inputAmount: '',
            amount: null
          })
        }

        handleSubmit = () => {
          if (this.vouchingTxError() || this.approveTxError()) {
            this.resetForm()
            this.focusOnInput()
          } else if (this.vouchingTxCompleted()) {
            this.resetForm()
          } else if (this.notEnoughAllowance()) {
            this.approveTransaction()
          } else if (this.approveTxCompleted() || this.state.inputAmount) {
            this.vouchTransaction()
          } else {
            this.setState({ amountError: true })
          }
        }

        approveTransaction () {
          const txData = {
            contractName: 'ZepToken',
            method: 'approve',
            args: [
              abiMapping.getAddress('Vouching', this.props.networkAccount.networkId),
              this.vouchAmount()
            ]
          }

          this.props.sendTransaction({
            variables: {
              txData
            }
          }).then(({ data }) => {
            this.setState({
              lastTransactionId: data.sendTransaction.id
            })
          })
        }

        vouchTransaction () {
          const txData = {
            contractName: 'Vouching',
            method: 'vouch',
            args: [
              this.props.packageId,
              toWei(this.state.inputAmount)
            ]
          }

          this.props.sendTransaction({
            variables: {
              txData
            }
          }).then(({ data }) => {
            this.setState({
              lastTransactionId: data.sendTransaction.id
            })
          })
        }

        notEnoughZepError () {
          const { token } = this.props
          let notEnoughZepError = false
          if (token && token.ZepToken) {
            notEnoughZepError =
              toWei(this.state.inputAmount).gt(bigNumberify(token.ZepToken.myBalance))
          }
          return notEnoughZepError
        }

        vouchAmount () {
          let vouchAmount = bigNumberify(0)
          if (this.state.inputAmount) {
            vouchAmount = toWei(this.state.inputAmount)
          }
          return vouchAmount
        }

        zepAllowance = () => {
          let allowance

          const { token } = this.props

          if (token && token.ZepToken) {
            allowance = token.ZepToken.allowance
          }
          if (!allowance) {
            allowance = bigNumberify(0)
          }
          return allowance
        }

        notEnoughAllowance = () => {
          return this.zepAllowance().lt(this.vouchAmount())
        }

        notLoggedIn () {
          const { networkAccount } = this.props
          let notLoggedIn = true
          if (networkAccount) {
            notLoggedIn = !networkAccount.account
          }
          return notLoggedIn
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
            return 'Download Cipher Browser'
          } else if (this.needsAndroidWeb3()) {
            return 'Download Opera'
          } else {
            return 'Download MetaMask'
          }
        }

        downloadUrl = () => {
          if (this.needsIOSWeb3()) {
            return 'https://itunes.apple.com/us/app/cipher-browser-ethereum/id1294572970'
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

        hasUncompletedTransaction () {
          return this.hasUncompletedVouchTx() || this.hasUncompletedApproveTx()
        }

        hasUncompletedVouchTx () {
          return this.props.vouchTx && !this.props.vouchTx.completed
        }

        hasUncompletedApproveTx () {
          return this.props.approveTx && !this.props.approveTx.completed
        }

        render () {
          const { loading, error } = this.props

          if (error) { return error.toString() }
          if (loading) { return null }

          return (
            <form
              className={classnames('form', this.formClassName())}
              onSubmit={(e) => {
                e.preventDefault()
                this.handleSubmit()
              }}
            >
              <div className='field has-addons is-right'>
                <div className='control is-addons-form-height'>
                  {this.isDanger()
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
                    disabled={this.isInputDisabled()}
                    ref={this.textInputRef}
                    type='number'
                    placeholder='0'
                    className='input is-large'
                    value={this.state.inputAmount}
                    onChange={this.handleAmountChange}
                  />
                </div>
                <div className='control is-addons-form-height'>
                  <button
                    disabled={this.isButtonDisabled()}
                    className='button is-text no-scale'
                  >
                    {this.buttonText()}
                  </button>
                </div>
              </div>
              <p className={classnames('help is-size-6', this.helpClassName())}>
                {this.helpText() || '\u00A0'} {this.downloadLink()}
              </p>
            </form>
          )
        }
      }
    )
  )
)
