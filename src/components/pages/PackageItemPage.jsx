import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { ScrollToTop } from '~/components/ScrollToTop'
import { PackageDetails } from '~/components/packages/PackageDetails'
import { VouchingQueries } from '~/queries/VouchingQueries'
import * as routes from '~/../config/routes'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      registeredEvents: Registered @pastEvents(fromBlock: 0, toBlock: "latest")
    }
  }
`

const packageQuery = gql`
  query packageQuery($uri: String!, $id: String!) {
    ...Metadata
    Vouching @contract {
      totalVouched(id: $id)
      ...ChallengedEvents
    }
  }
  ${VouchingQueries.Metadata}
  ${VouchingQueries.ChallengedEvents}
`

export class PackageItemPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
        <Helmet
          title='EVM Package'
        />

        <ScrollToTop />

        <div className='container'>
          <div className='columns'>
            <div className='column main-content--column is-full-desktop is-12-widescreen'>
              <Link
                to={routes.HOME}
                className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
              >
                {'<'} Back to Packages
              </Link>

              <Query query={eventsQuery}>
                {({ loading, error, data }) => {
                  if (loading) return null
                  if (error) return `Error!: ${error}`

                  const events = data.Vouching ? data.Vouching.registeredEvents : []
                  const id = this.props.match.params.id
                  const event = events.find((event) => event.parsedLog.values.id.eq(id))

                  if (!event) {
                    console.warn('event not found')
                    return null
                  }

                  const packageItem = event.parsedLog.values

                  return (
                    <Query query={packageQuery} variables={{ uri: packageItem.metadataURI, id: packageItem.id }}>
                      {
                        ({ loading, error, data }) => {
                          if (loading) return null
                          if (error) return `Error!: ${error}`

                          const { metadata, Vouching } = data

                          return (
                            <>
                              <Helmet
                                title={`${metadata.name}`}
                              />
                              <PackageDetails
                                metadata={metadata}
                                vouching={Vouching}
                                registeredEvent={event}
                              />
                            </>
                          )
                        }
                      }
                    </Query>
                  )
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
