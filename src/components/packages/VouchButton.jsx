import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { transactionQueries } from '~/queries/transactionQueries'
import { VouchMutationForm } from '~/components/packages/VouchMutationForm'
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
          let mostRecentTxHasError

          if (errors) { console.warn(errors) }

          const txs = get(data, 'getAllTransactionsByPackageId', [])

          const hasUncompletedTransaction = txs.filter(tx => !tx.completed).length > 0
          const hasSentTransaction = txs.filter(tx => (tx.sent && !tx.completed)).length > 0

          // iterate through the array of tx's for this package and set the
          // variable mostRecentTxHasError to the last tx
          txs.forEach(tx => { mostRecentTxHasError = tx.error })

          // This sets the proper state when the voucher navigates away
          // then comes back
          const showVouchMutationForm = (
            this.state.isVouching ||
            mostRecentTxHasError ||
            hasSentTransaction
          )

          return (
            showVouchMutationForm ? (
              <VouchMutationForm
                mostRecentTxHasError={mostRecentTxHasError}
                hasSentTransaction={hasSentTransaction}
                hasUncompletedTransaction={hasUncompletedTransaction}
                packageId={packageId}
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
