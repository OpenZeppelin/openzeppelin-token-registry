import React, { Component } from 'react'
import { Mutation, Query, withApollo } from 'react-apollo'
import { Web3Mutations } from '~/mutations/Web3Mutations'
import { transactionQueries } from '~/queries/transactionQueries'
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

    // componentDidUpdate(prevProps, prevState) {
    //   const packageId = this.props.packageId
    //   // alert('found!')
    //
    //   try {
    //     const ongoingTx = this.props.client.readQuery({
    //       query: transactionQueries.transactionsQuery,
    //       variables: { packageId }
    //     })
    //     console.log(ongoingTx)
    //
    //     if (!this.state.ongoingTx) {
    //       this.setState({
    //         ongoingTx
    //       })
    //     }
    //   } catch (error) {
    //     // console.warn(error)
    //   }
    // }

    render() {
      return (
        <Query
          query={transactionQueries.findTransactionQuery}
          variables={{ id: this.props.packageId }}
          pollInterval={5000}
        >
          {({ data, refetch }) => {
            // alert(data)
            console.log('in query, Query data: ', data)
            // refetch()

            return (
              <Mutation
                mutation={Web3Mutations.sendTransaction}
                variables={{
                  txData: this.state.txData
                }}
              >
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
                          ref={this.textInputRef}
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
          }}
        </Query>
      )
    }
  }
)
