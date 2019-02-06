import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { transactionQueries } from '~/queries/transactionQueries'
import { VouchMutationForm } from '~/components/packages/VouchMutationForm'
import { getSystemInfo } from '~/utils/getSystemInfo'
import { get } from 'lodash'

export const VouchButton = class _VouchButton extends Component {
  state = {
    isVouching: false
  }

  render () {
    const { packageId } = this.props

    return (
      <Query
        query={transactionQueries.getAllTransactionsByPackageId}
        variables={{ packageId: this.props.packageId.toString() }}
      >
        {({ data, refetch, loading, errors }) => {
          if (errors) { console.warn(errors) }

          const txs = get(data, 'getAllTransactionsByPackageId', [])

          let hasUncompletedTransaction = false
          let hasSentTransaction = false
          let mostRecentTxHasError = false
          let vouchAmount = null

          if (txs.length) {
            const tx = txs[txs.length - 1]
            hasUncompletedTransaction = !tx.completed
            hasSentTransaction = tx.sent && !tx.completed
            mostRecentTxHasError = !!tx.error
            vouchAmount = tx.args.values[1].toString()
          }

          // This sets the proper state when the voucher navigates away
          // then comes back
          const showVouchMutationForm = (
            this.state.isVouching ||
            (txs.length > 0)
          )

          return (
            showVouchMutationForm ? (
              <VouchMutationForm
                mostRecentTxHasError={mostRecentTxHasError}
                hasSentTransaction={hasSentTransaction}
                hasUncompletedTransaction={hasUncompletedTransaction}
                vouchAmount={vouchAmount}
                packageId={packageId}
                systemInfo={getSystemInfo()}
              />
            ) : (
              <div className='is-addons-form-toggler-height'>
                <button
                  className='button is-dark is-pill'
                  onClick={(e) => { this.setState({ isVouching: true }) }}
                >
                  Vouch
                </button>
              </div>
            )
          )
        }}
      </Query>
    )
  }
}
