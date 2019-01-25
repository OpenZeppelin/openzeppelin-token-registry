import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { transactionQueries } from '~/queries/transactionQueries'
import { VouchMutationForm } from '~/components/packages/VouchMutationForm'

export const VouchButton = class _VouchButton extends Component {
  state = {
    isVouching: false
  }

  render() {
    const { packageId } = this.props

    return (
      <Query
        query={transactionQueries.getUncompletedTransactionsByPackageId}
        variables={{ packageId: this.props.packageId }}
        pollInterval={2000}
      >
        {({ data, refetch, loading, errors }) => {
          let hasUncompletedTransaction = false

          // if (errors) { console.error('errors', errors) }
          // if (loading) { console.log('loading ', loading) }

          if (!hasUncompletedTransaction && data && data.getUncompletedTransactionsByPackageId) {
            // console.log(`got ${data.getUncompletedTransactionsByPackageId.length} transactions!`)
            // console.log(data.getUncompletedTransactionsByPackageId[0])
            hasUncompletedTransaction = (data.getUncompletedTransactionsByPackageId.length > 0)
          }

          const showVouchMutationForm = (this.state.isVouching || hasUncompletedTransaction)

          return (
            showVouchMutationForm ? (
              <VouchMutationForm
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
