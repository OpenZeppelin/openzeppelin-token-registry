import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { HeroBetaCallout } from '~/components/HeroBetaCallout'
import { FooterContainer } from '~/components/layout/Footer'
import { PageDetailsLoader } from '~/components/PageDetailsLoader'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ScrollToTop } from '~/components/ScrollToTop'
import { PackageDetails } from '~/components/packages/PackageDetails'
import { vouchingQueries } from '~/queries/vouchingQueries'
import * as routes from '~/../config/routes'

export class ResearcherPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render () {
    const address = this.props.match.params.address

    const researcher = {
      metadataURI: 'fake',
      id: 'fake'
    }

    return (
      <div className='is-positioned-absolutely is-full-width'>
        <Helmet
          title='Researcher'
        />

        <ScrollToTop />

        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column main-content--column is-10-tablet is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
                <p className='content'>
                  <Link
                    to={routes.HOME_RESEARCHERS_LIST}
                    className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
                  >
                    {'<'} Back to Researchers
                  </Link>
                </p>

                <h1 className='is-size-1'>
                  {address}
                </h1>

                <Query query={vouchingQueries.eventsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <PageDetailsLoader />
                    if (error) return <ErrorMessage errorMessage={error} />

                    // const events = data.Vouching ? data.Vouching.Registered : []
                    // const id = this.props.match.params.id
                    // const event = events.find((event) => event.parsedLog.values.id.eq(id))

                    // if (!event) {
                    //   console.warn('event not found')
                    //   return null
                    // }

                    // const researcher = event.parsedLog.values
                    
                    return (
                      <Query
                        query={vouchingQueries.packageQuery}
                        variables={{ uri: researcher.metadataURI, id: researcher.id.toString() }}
                      >
                        {
                          ({ loading, error, data }) => {
                            if (loading) return <PageDetailsLoader />
                            if (error) return <ErrorMessage errorMessage={error} />

                            const { metadata, Vouching } = data

                            return (
                              <>
                                <Helmet
                                  title={`${metadata.name}`}
                                />
                                Details
                                {/* <PackageDetails
                                  metadata={metadata}
                                  vouching={Vouching}
                                  registeredEvent={event}
                                /> */}
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
        </section>

        <HeroBetaCallout />

        <FooterContainer />
      </div>
    )
  }
}
