import React, { PureComponent } from 'react'
import { ethers } from 'ethers'
import { get } from 'lodash'
import { Query, graphql, withApollo } from 'react-apollo'
import { ErrorMessage } from '~/components/ErrorMessage'
import { PackageListItem } from '~/components/packages/PackageListItem'
import { PackageListItemLoader } from '~/components/packages/PackageListItemLoader'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'

export const PackageList = graphql(vouchingQueries.eventsQuery)(withApollo(class _PackageList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      totalVouches: []
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const events = this.eventsFromProps(this.props)
    if (Object.keys(this.state.totalVouches).length === events.length) {
      return
    }

    const { client } = this.props

    Promise.all(
      events.map(event => {
        const id = event.parsedLog.values.id
        return (
          client.query({ query: vouchingQueries.vouchQuery, variables: { id } })
            .then(result => {
              return {
                id,
                totalVouched: result.data.Vouching.totalVouched
              }
            })
        )
      })
    ).then((results) => {
      var totalVouches = results.reduce((accumulator, result) => {
        accumulator[result.id] = result.totalVouched
        return accumulator
      }, {})

      this.setState({
        totalVouches
      })
    })
  }

  eventsFromProps (props) {
    const { data } = props
    const { Vouching } = data || {}
    return (Vouching ? Vouching.registeredEvents : []) || []
  }

  totalVouched (id) {
    return this.state.totalVouches[id]
      ? ethers.utils.bigNumberify(this.state.totalVouches[id].toString())
      : ethers.utils.bigNumberify('0')
  }

  render () {
    const { loading, error } = this.props.data || {}

    const packageListLoader =
      <React.Fragment>
        <PackageListItemLoader key='0' />
        <PackageListItemLoader key='1' />
        <PackageListItemLoader key='2' />
      </React.Fragment>

    if (loading) {
      return packageListLoader
    }

    if (error) {
      return <ErrorMessage errorMessage={error} />
    }

    const events = this.eventsFromProps(this.props)

    if (Object.keys(this.state.totalVouches).length !== events.length) {
      return packageListLoader
    }

    const sortedEvents = events.sort((a, b) => {
      const idA = a.parsedLog.values.id
      const idB = b.parsedLog.values.id
      return this.totalVouched(idA).cmp(this.totalVouched(idB))
    })

    return (
      <>
        <div className='has-text-centered'>
          <h2 className='is-size-2'>
            Top Trusted Packages
          </h2>
          <div className='message'>
            <div className='message-body message--cta'>
              <h5 className='is-size-5 has-text-grey'>
                Want to see your package here?
              </h5>
              <button className='button is-purple is-pill'>
                Join the Beta
              </button>
            </div>
          </div>
        </div>

        {
          sortedEvents.map((event, index) => {
            const packageValues = event.parsedLog.values

            return (
              <Query
                key={`package-item-query-${index}`}
                query={vouchingQueries.packageQuery}
                variables={{
                  uri: packageValues.metadataURI,
                  id: packageValues.id
                }}
              >
                {
                  ({ loading, error, data }) => {
                    // using the PackageListItemLoader here can cause packages to not load
                    // if (loading) return <PackageListItemLoader />
                    if (error) return <ErrorMessage errorMessage={error} />

                    const { Vouching } = data

                    if (displayWeiToEther(get(Vouching, 'totalVouched')) === '0') {
                      console.log('skipping package with 0 vouched ZEP')
                      return null
                    }

                    return (
                      <PackageListItem
                        index={index}
                        location={this.props.location}
                        data={data}
                        package={packageValues}
                        key={`package-item-${index}`}
                      />
                    )
                  }
                }
              </Query>
            )
          })
        }
      </>
    )
  }
}))
