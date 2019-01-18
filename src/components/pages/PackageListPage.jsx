import React, { PureComponent } from 'react'
import classnames from 'classnames'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { ScrollToTop } from '~/components/ScrollToTop'
import { PackageList } from '~/components/packages/PackageList'
import { ResearchersList } from '~/components/researchers/ResearchersList'
import * as routes from '~/../config/routes'

const networkIdQuery = gql`
  query networkIdQuery {
    networkId @client
  }
`

export class PackageListPage extends PureComponent {
  render () {
    const heroColor = 'is-light'
    // const heroColor = 'is-dark'
    const showResearchersList = this.props.location.pathname === '/researchers-list'

    return (
      <div className='is-positioned-absolutely is-full-width'>
        <ScrollToTop />

        <section className={`hero ${heroColor}`}>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-full-desktop is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd'>
                  <div className='has-text-centered'>
                    <h2 className='title hero--title is-size-1'>
                      {/*zeppelin<span className='has-text-primary'>OS</span> Beta*/}
                      zeppelinOS Beta
                    </h2>
                    <p className="is-size-6">
                      Interested in developing your own EVM package?
                      <br />
                      Want to vouch for your favourite libraries?
                    </p>
                    <br />
                    <p>
                      <button className={`button is-pill ${heroColor === 'is-light' ? 'is-black' : 'is-primary'}`}>Sign me up!</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                EVM Packages
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

        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column main-content--column package-list--column is-full-desktop is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
                <Query query={networkIdQuery}>
                  {({ data }) => {
                    const wrongNetwork = !data || allowedNetworkIds().indexOf(data.networkId) === -1

                    if (wrongNetwork) {
                      return <span>No packages available on your current network.</span>
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
      </div>
    )
  }
}
