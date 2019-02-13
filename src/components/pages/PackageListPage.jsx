import React, { PureComponent } from 'react'
import classnames from 'classnames'
import yn from 'yn'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { FooterContainer } from '~/components/layout/Footer'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ScrollToTop } from '~/components/ScrollToTop'
import { PackageList } from '~/components/packages/PackageList'
import { PhaseOneHero } from '~/components/packages/PhaseOneHero'
// import { PreviousHero } from '~/components/packages/PreviousHero'
import { ResearchersList } from '~/components/researchers/ResearchersList'
import { web3Queries } from '~/queries/web3Queries'
import * as routes from '~/../config/routes'

export class PackageListPage extends PureComponent {
  render () {
    const heroColor = 'is-link'
    // const heroColor = 'is-light'
    // const heroColor = 'is-dark'
    const showResearchersList = this.props.location.pathname === '/researchers-list'

    return (
      <div className='is-positioned-absolutely'>
        <ScrollToTop />

        {/* <PreviousHero heroColor={heroColor} /> */}
        <PhaseOneHero heroColor={heroColor} />

        {
          yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
            <section className='section has-level'>
              <nav className='level is-secondary-nav'>
                <p
                  className={classnames(
                    'level-item',
                    'has-text-centered',
                    {
                      'is-active': !showResearchersList
                    }
                  )}
                >
                  <Link
                    className='button is-text link is-monospaced'
                    to={routes.HOME}
                  >
                    Top Packages
                  </Link>
                </p>
                <p
                  className={classnames(
                    'level-item',
                    'has-text-centered',
                    {
                      'is-active': showResearchersList
                    }
                  )}
                >
                  <Link
                    className='button is-text link is-monospaced'
                    to={routes.HOME_RESEARCHERS_LIST}
                  >
                    Security Researchers
                  </Link>
                </p>
              </nav>
            </section>
          )
        }

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              {/* is-10-tablet is-10-desktop is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd */}
              <div className='col-xs-12'>
                <Query query={web3Queries.networkIdQuery}>
                  {({ data }) => {
                    const wrongNetwork = data && data.networkId && allowedNetworkIds().indexOf(data.networkId) === -1

                    if (wrongNetwork) {
                      return <ErrorMessage errorMessage={
                        `No packages available on the currently selected Ethereum network.`
                      } />
                    } else {
                      return showResearchersList
                        ? <ResearchersList location={this.props.location} />
                        : <PackageList location={this.props.location} />
                    }
                  }}
                </Query>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}
