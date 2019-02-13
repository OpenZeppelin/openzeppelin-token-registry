import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ethers } from 'ethers'
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
import { normalizeAddr } from '~/utils/normalizeAddr'

export class ResearcherPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    const address = normalizeAddr(this.props.match.params.address)
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

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <p className='content'>
                  <button
                    onClick={this.context.router.history.goBack}
                    className='button is-monospaced is-text has-text-weight-bold back-button has-underline-border'
                  >
                    {'<'} Back
                  </button>
                </p>

                <div className='row reverse-column-order'>
                  <div className='col-xs-12 col-md-7'>
                    <ResearcherNameAndAddress address={address} />

                    <br />
                    <br />
                    <br />

                    <Query query={vouchingQueries.researcherVouchesQuery} variables={{ address: address.toString() }}>
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

                  <div className='col-xs-12 col-start-md-8 col-md-5 has-text-right--desktop'>
                    <br />
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
