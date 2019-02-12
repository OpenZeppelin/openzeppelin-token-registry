import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ethers } from 'ethers'
import { Link } from 'react-router-dom'
import { createCanvas } from 'canvas'
import { renderIcon } from '@download/blockies'
import { Query } from 'react-apollo'
import { ResearcherNameAndAddress } from '~/components/researchers/ResearcherNameAndAddress'
import { HeroBetaCallout } from '~/components/HeroBetaCallout'
import { FooterContainer } from '~/components/layout/Footer'
import { ErrorMessage } from '~/components/ErrorMessage'
import { PageDetailsLoader } from '~/components/PageDetailsLoader'
import { PackageItemListRow } from '~/components/PackageItemListRow'
import { ScrollToTop } from '~/components/ScrollToTop'
import { projectResearcherVouchedPackages } from '~/projections/projectResearcherVouchedPackages'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import * as routes from '~/../config/routes'

export class ResearcherPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render () {
    const address = this.props.match.params.address
    const canvas = createCanvas(50, 50)
    const icon = renderIcon(
      {
        seed: address,
        color: '#dfe',
        bgcolor: '#fff',
        size: 10, // width/height of the icon in blocks, default: 10
        scale: 5 // width/height of each block in pixels, default: 5
      },
      canvas
    )

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

                <div className='columns reverse-column-order'>
                  <div className='column is-7-tablet is-8-desktop'>
                    <ResearcherNameAndAddress address={address} />

                    <br />
                    <br />
                    <br />

                    <Query query={vouchingQueries.vouchesQuery}>
                      {({ loading, error, data }) => {
                        let content

                        if (error) return <ErrorMessage errorMessage={error} />

                        const events = (data.Vouching ? data.Vouching.allEvents : []) || []

                        if (loading) {
                          content = <PageDetailsLoader />
                        } else {
                          const result = projectResearcherVouchedPackages(address, events)
                          const packageItems = Object.values(result.packages)

                          let totalVouched = ethers.utils.bigNumberify(0)
                          packageItems.forEach(item => {
                            totalVouched = totalVouched.add(item.vouchTotals[address])
                          })

                          content = (
                            <>
                              <h5 className='is-size-5 has-text-weight-semibold'>
                                Has vouched {displayWeiToEther(totalVouched)} ZEP against {packageItems.length} {packageItems.length === 1 ? 'package' : 'packages'}
                              </h5>

                              <br />

                              <ul className='list'>
                                {packageItems.map(packageItem =>
                                  <PackageItemListRow
                                    key={`packageItem-row-${packageItem.id}`}
                                    packageItem={packageItem}
                                    address={address}
                                  />
                                )}
                              </ul>
                            </>
                          )
                        }

                        return (
                          <>
                            <Helmet
                              title={`Security Resercher ${address}`}
                            />

                            {content}
                          </>
                        )
                      }}
                    </Query>
                  </div>

                  <div className='column is-5-tablet is-4-desktop has-text-right--desktop'>
                    <img src={icon.toDataURL()} alt='blockies icon of ethereum address' />
                  </div>
                </div>

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
