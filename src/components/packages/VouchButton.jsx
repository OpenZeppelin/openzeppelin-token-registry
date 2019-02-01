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
        query={transactionQueries.getUncompletedTransactionsByPackageId}
        variables={{ packageId: this.props.packageId }}
      >
        {({ data, refetch, loading, errors }) => {
          if (errors) { console.warn(errors) }

          const hasUncompletedTransaction = get(data, 'getUncompletedTransactionsByPackageId', []).length > 0
          // console.log('getUncompletedTransactionsByPackageId', get(data, 'getUncompletedTransactionsByPackageId', []).length)

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

// pollInterval={2000}
// fetchPolicy='network-only'