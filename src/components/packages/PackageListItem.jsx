import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatRoute } from 'react-router-named-routes'
import { Redirect } from 'react-router-dom'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash.get'
import ZeppelinOSLogo from '~/assets/images/zep-token-logo.svg'
import * as routes from '~/../config/routes'

const packageQuery = gql`
  query packageQuery($path: String) {
    metadata(path: $path) @rest(path: $path) {
      id
      name
      version
      description
    }
  }
`

export class PackageListItem extends PureComponent {
  state = {}

  static propTypes = {
    package: PropTypes.object.isRequired
  }

  handlePackageItemClick = (e) => {
    e.preventDefault()

    this.setState({ toPackage: true })
  }

  render () {
    // console.log(this.props.package)
    return (
      <Query query={packageQuery} variables={{ path: this.props.package.metadataURI }}>
        {
          ({ data }) => {
            const { metadata } = data || {}
            const { slug, version } = metadata || {}

            if (this.state.toPackage) {
              return <Redirect to={formatRoute(routes.PACKAGE_ITEM, { slug, version })} />
            }

            return (
              <div className='package-list-item panel'>
                <span onClick={this.handlePackageItemClick}>
                  <div className='panel-block'>
                    <div className='columns'>
                      <div className='column is-three-quarters'>
                        <h4 className='title is-size-4'>
                          {get(metadata, 'name')}

                          <span className="package-list-item--version has-text-grey has-text-weight-light">
                            v{get(metadata, 'version')}
                          </span>
                        </h4>
                        <code className="code--quick-install">
                          $ zos link {get(metadata, 'name')}
                        </code>
                        <a
                          className="package-list-item--github-icon"
                          href="https://github.com/DeltaCamp/zeppelin-vouching-app"
                        >
                          <AntdIcon type={GithubFill} className="antd-icon" />
                        </a>
                      </div>

                      <div className='column has-text-right'>
                        <h6 className='subtitle is-size-7 package-list-item--subtitle'>
                          VOUCHED
                        </h6>

                        <span className='is-inline-block'>
                          <ZeppelinOSLogo width='20' height='20' className='package-list-item--zep-token-logo' />
                        </span>

                        <h3 className='is-inline-block is-size-3 has-text-weight-light'>
                          4,000
                        </h3>

                        <a href="#" className='is-block package-list-item--challenges-link'>2 challenges</a>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            )
          }
        }
      </Query>
    )
  }
}
