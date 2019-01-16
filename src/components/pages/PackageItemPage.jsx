import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { PackageDetails } from '~/components/packages/PackageDetails'
import * as routes from '~/../config/routes'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      registeredEvents: Registered @pastEvents(fromBlock: "0", toBlock: "latest")
    }
  }
`

const packageQuery = gql`
  query packageQuery($path: String!) {
    metadata(path: $path) @rest(path: $path) {
      id
      name
      version
      description
    }
  }
`

export class PackageItemPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
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
                  const event = events.find((event) => event.returnValues.id === id)

                  if (!event) {
                    console.warn('event not found')
                    return null
                  }

                  const packageItem = event.returnValues

                  return (
                    <Query query={packageQuery} variables={{ path: packageItem.metadataURI }}>
                      {
                        ({ loading, error, data }) => {
                          if (loading) return null
                          if (error) return `Error!: ${error}`

                          return <PackageDetails
                            metadata={data.metadata}
                          />
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
