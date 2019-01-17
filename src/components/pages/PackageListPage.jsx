import React, { PureComponent } from 'react'
import classnames from 'classnames'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { ScrollToTop } from '~/components/ScrollToTop'
import { PackageList } from '~/components/packages/PackageList'

const networkIdQuery = gql`
  query networkIdQuery {
    networkId @client
  }
`

export class PackageListPage extends PureComponent {
  state = {
    showPackages: true
  }

  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
        <ScrollToTop />

        <section className='hero is-dark is-bold'>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-full-desktop is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd'>
                  <div className='has-text-centered'>
                    <h2 className='title hero--title'>
                      zeppelin<span className='has-text-primary'>OS</span> Beta
                    </h2>
                    <p className='is-monospaced'>
                      Interested in developing your own EVM package?
                      <br />
                      Want to vouch for your favourite libraries?
                    </p>
                    <br />
                    <p>
                      <button className='button is-primary is-pill'>Sign me up!</button>
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
                  'is-active': this.state.showPackages
                }
              )}
            >
              <button
                className='button is-text link is-monospaced'
                onClick={(e) => { this.setState({ showPackages: true }) } }
              >
                EVM Packages
              </button>
            </p>
            <p
              className={classnames(
                'level-item',
                'has-text-centered',
                {
                  'is-active': !this.state.showPackages
                }
              )}
            >
              <button
                className='button is-text link is-monospaced'
                onClick={(e) => { this.setState({ showPackages: false }) } }
              >
                Security Researchers
              </button>
            </p>
          </nav>
        </section>

        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column main-content--column package-list--column is-full-desktop is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
                <Query query={networkIdQuery}>
                  {({ data }) => {
                    if (allowedNetworkIds().indexOf(data.networkId) !== -1){
                      return this.state.showPackages
                        ? <PackageList location={this.props.location} />
                        : <p>Researchers list coming soon ...</p>
                    } else {
                      return <span>No packages available on your current network.</span>
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
