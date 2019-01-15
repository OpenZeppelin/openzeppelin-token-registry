import React, {
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import {
  GithubFill
} from '@ant-design/icons'
import ZeppelinOSLogo from '~/assets/images/zep-token-logo.svg'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import get from 'lodash.get'

const packageQuery = gql`
  query packageQuery {
    metadata @rest(path: "/testPackage.json") {
      name
      version
      description
    }
  }
`

export class PackageListItem extends PureComponent {
  static propTypes = {
    package: PropTypes.object.isRequired
  }

  render () {
    return (
      <Query query={packageQuery}>
        {
          ({ data }) => {
            const { metadata } = data || {}
            return (
              <div className='package-list-item panel'>
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
              </div>
            )
          }
        }
      </Query>
    )
  }
}
