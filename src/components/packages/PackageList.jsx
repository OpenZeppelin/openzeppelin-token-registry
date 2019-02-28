import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { Query, graphql, withApollo } from 'react-apollo'
import { ErrorMessage } from '~/components/ErrorMessage'
import { PackageListItem } from '~/components/packages/PackageListItem'
import { PackageListItemLoader } from '~/components/packages/PackageListItemLoader'
import { projectPackageVouchTotals } from '~/projections/projectPackageVouchTotals'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import * as routes from '~/../config/routes'

export const PackageList = graphql(vouchingQueries.allEventsQuery)(withApollo(class _PackageList extends PureComponent {
  render () {
    const { loading, error, Vouching } = this.props.data || {}

    if (error) {
      return <ErrorMessage errorMessage={error} />
    }

    let content
    if (loading) {
      content = <>
        <PackageListItemLoader key='package-item-fragment-0' />
        <PackageListItemLoader key='package-item-fragment-1' />
        <PackageListItemLoader key='package-item-fragment-2' />
      </>
    } else {
      const events = (Vouching ? Vouching.allEvents : []) || []
      const packageVouchTotals = projectPackageVouchTotals(events || [])
      const packageIds = Object.keys(packageVouchTotals.packages)

      const sortedPackageIds = packageIds.sort((a, b) => {
        return packageVouchTotals.packages[a].vouchTotal.cmp(packageVouchTotals.packages[b].vouchTotal)
      })

      content = (
        <>
          {
            sortedPackageIds.map((packageId, index) => {
              let item

              const { metadataURI } = packageVouchTotals.packages[packageId]

              item = (
                <React.Fragment key={`package-item-fragment-${index}`}>
                  {item}
                  <Query
                    key={`package-item-query-${index}`}
                    query={vouchingQueries.packageQuery}
                    variables={{
                      uri: metadataURI,
                      id: packageId.toString()
                    }}
                  >
                    {
                      ({ loading, error, data }) => {
                        // using the PackageListItemLoader here can cause packages to not load
                        if (loading) return <PackageListItemLoader />
                        if (error) return <ErrorMessage errorMessage={error} />

                        const { metadata, Vouching } = data
                        const { entry } = Vouching || {}

                        if (displayWeiToEther(get(Vouching, 'entry.totalVouched')) === '0') {
                          console.log('skipping package with 0 vouched ZEP')
                          return null
                        }

                        return (
                          <PackageListItem
                            index={index}
                            location={this.props.location}
                            packageId={packageId.toString()}
                            entry={entry}
                            metadata={metadata}
                            key={`package-item-${index}`}
                          />
                        )
                      }
                    }
                  </Query>
                </React.Fragment>
              )

              return item
            })
          }
        </>
      )
    }

    return (
      <>
        <h5 className='is-size-5 has-text-grey-dark is-uppercase is-monospaced has-text-centered'>
          Top Trusted Packages
        </h5>
        <br />

        <div className='message-white has-text-centered'>
          <div className='message-white--body'>
            <p className='message-body--text has-text-grey'>
              Want to see your package here?
            </p>
            <Link
              className='button is-purple is-pill'
              to={routes.BETA_SIGNUP}
            >
              Join the Beta
            </Link>
          </div>
        </div>

        {content}
      </>
    )
  }
}))
