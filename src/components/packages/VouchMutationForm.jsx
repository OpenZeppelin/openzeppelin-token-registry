import React, { Component } from 'react'
import classnames from 'classnames'
import AntdIcon from '@ant-design/icons-react'
import { ExclamationCircleOutline } from '@ant-design/icons'
import { graphql } from 'react-apollo'
import { Web3Mutations } from '~/mutations/Web3Mutations'
import { tokenFragments } from '~/queries/tokenQueries'
import { web3Queries } from '~/queries/web3Queries'
import { toWei } from '~/utils/toWei'
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
          newVouch: false,
          amountError: false
        }

        constructor (props) {
          super(props)
          this.textInputRef = React.createRef()
          const vouchTx = props.vouchTx
          this.state = {
            defaultAmount: vouchTx ? vouchTx.args.values[1].toString() : null
          }
        }

        handleAmountChange = (e) => {
          let amount = e.target.value.replace(new RegExp(/^-?![0-9]+/))
          amount = toWei(amount)

          this.setState({
            amount,
            amountError: false
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
          const vouchTx = this.props.vouchTx
          return vouchTx && vouchTx.sent && !vouchTx.completed
        }

        hasSentApproveTx () {
          const approveTx = this.props.approveTx
          return approveTx && approveTx.sent && !approveTx.completed
        }

        vouchingTxError () {
          const vouchTx = this.props.vouchTx
          return !this.state.newVouch && vouchTx && !!vouchTx.error
        }

        vouchingTxCompleted () {
          const vouchTx = this.props.vouchTx
          return !this.state.newVouch && vouchTx && vouchTx.completed
        }

        approveTxError () {
          const approveTx = this.props.approveTx
          return !this.state.newVouch && approveTx && !!approveTx.error
        }

        approveTxCompleted () {
          const approveTx = this.props.approveTx
          return !this.state.newVouch && approveTx && approveTx.completed
        }

        helpText = () => {
          let text = ''

          if (this.needsWeb3()) {
            text = `You will need to`
          } else if (this.hasSentTransaction()) {
            text = 'Waiting for confirmation...'
          } else if (this.hasUncompletedTransaction()) {
            text = 'Waiting to receive transaction...'
          } else if (this.notLoggedIn()) {
            text = `You need to login to MetaMask`
          } else if (this.notEnoughZepError()) {
            text = `You don't have enough ZEP tokens`
          } else if (this.notEnoughAllowance()) {
            text = `You must first approve ${displayWeiToEther(this.vouchAmount())} tokens`
          } else if (this.state.amountError) {
            text = 'Please enter an amount'
          } else if (this.vouchingTxError()) {
            text = 'Vouching was not completed'
          } else if (this.vouchingTxCompleted()) {
            text = 'Vouching completed'
          }

          return text
        }

        buttonText = () => {
          let text = 'Vouch'

          if (this.vouchingTxError()) {
            text = 'Retry'
          } else if (this.vouchingTxCompleted()) {
            text = 'Done'
          } else if (this.notEnoughAllowance()) {
            text = 'Approve'
          }

          return text
        }

        isWarning () {
          return this.needsWeb3() && !this.hasUncompletedTransaction()
        }

        isDanger () {
          return this.state.amountError || this.vouchingTxError() || this.notEnoughZepError() || this.notLoggedIn()
        }

        isSuccess () {
          return this.vouchingTxCompleted() && !this.vouchingTxError()
        }

        isInputDisabled () {
          return this.hasUncompletedTransaction() || this.vouchingTxCompleted() || this.vouchingTxError() || this.notLoggedIn()
        }

        isButtonDisabled () {
          return this.hasUncompletedTransaction() || this.vouchingTxError() || this.notLoggedIn()
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
            newVouch: true
          })
          this.textInputRef.current.value = ''
        }

        handleSubmit = () => {
          if (this.vouchingTxError() || this.approveTxError()) {
            this.resetForm()
            this.focusOnInput()
          } else if (this.vouchingTxCompleted()) {
            this.resetForm()
          } else if (this.notEnoughAllowance()) {
            this.approveTransaction()
          } else if (this.approveTxCompleted() || this.state.amount) {
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
          })
        }

        vouchTransaction () {
          const txData = {
            contractName: 'Vouching',
            method: 'vouch',
            args: [
              this.props.packageId,
              this.state.amount
            ]
          }

          this.props.sendTransaction({
            variables: {
              txData
            },
            onCompleted: () => {
              this.setState({
                newVouch: false
              })
            }
          })
        }

        notEnoughZepError () {
          const { token } = this.props
          let notEnoughZepError = false
          if (token && token.ZepToken) {
            notEnoughZepError =
              parseInt(this.state.amount, 10) > parseInt(token.ZepToken.myBalance)
          }
          return notEnoughZepError
        }

        vouchAmount () {
          let vouchAmount = ethers.utils.bigNumberify(0)
          if (this.state.amount) {
            vouchAmount = ethers.utils.bigNumberify(this.state.amount)
          }
          return vouchAmount
        }

        zepAllowance () {
          const { token } = this.props
          let allowance
          if (token && token.ZepToken) {
            allowance = token.ZepToken.allowance
          }
          if (!allowance) {
            allowance = ethers.utils.bigNumberify(0)
          }
          return allowance
        }

        notEnoughAllowance () {
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

          let extraInputProps = {}
          if (this.state.defaultAmount) {
            extraInputProps = {
              defaultValue: displayWeiToEther(this.state.defaultAmount)
            }
          }

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
                    {...extraInputProps}
                    placeholder='0'
                    className='input is-large'
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
