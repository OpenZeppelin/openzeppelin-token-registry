import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import get from 'lodash.get'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { formatRoute } from 'react-router-named-routes'
import { Redirect, Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { CodeSnippet } from '~/components/CodeSnippet'
import ZeppelinOSLogo from '~/assets/images/zep-token-logo.svg'
import * as routes from '~/../config/routes'

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

export const PackageListItem = ReactTimeout(class _PackageListItem extends PureComponent {
  state = {}

  static propTypes = {
    package: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.setTimeout(() => {
      this.setState({ startAnimating: true })
    }, 50)
  }

  handleGitHubLinkClick = (url) => {
    console.log('github link click')
    
    if (window) {
      window.location.href = url
    }
  }

  handleCodeClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleCopyClick = () => {
    this.setState({ copied: true })

    this.props.setTimeout(() => {
      this.setState({ copied: false })
    }, 3000)
  }

  render () {
    return (
      <Query query={packageQuery} variables={{ path: this.props.package.metadataURI }}>
        {
          ({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error!: ${error}`

            const { metadata } = data
            const { version } = metadata

            const id = parseInt(metadata.id, 10) - 1
            const link = formatRoute(routes.PACKAGE_ITEM, { id, version })

            if (this.state.toPackage) {
              return <Redirect to={link} />
            }

            return (
              <div
                className={
                  classnames(
                    'package-list-item',
                    'panel',
                    'slide-up',
                    'fade-in',
                    'slow',
                    {
                      'slide-up-enter': this.state.startAnimating,
                      'fade-in-enter': this.state.startAnimating
                    }
                  )
                }
                style={{ 'transitionDelay': `${this.props.index * 100}ms` }}
              >
                <Link
                  to={link}
                >
                  <div className='panel-block'>
                    <div className='columns'>
                      <div className='column is-three-quarters'>
                        <h4 className='title is-size-4'>
                          {get(metadata, 'name')}

                          <span className='package-list-item--version has-text-grey has-text-weight-light'>
                            v{get(metadata, 'version')}
                          </span>
                        </h4>

                        <CodeSnippet metadata={metadata} />

                        <button
                          className='package-list-item--github-icon is-text button'
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()

                            // this should be coming from the json data
                            const url = 'https://github.com/DeltaCamp/zeppelin-vouching-app'

                            this.handleGitHubLinkClick(url)
                          }}
                        >
                          <AntdIcon type={GithubFill} className='antd-icon' />
                        </button>
                      </div>

                      <div className='column has-text-right'>
                        <h6 className='subtitle is-size-7 package-list-item--subtitle is-monospaced'>
                          VOUCHED
                        </h6>

                        <span className='is-inline-block'>
                          <ZeppelinOSLogo width='20' height='20' className='package-list-item--zep-token-logo' />
                        </span>

                        <h3 className='is-inline-block is-size-3 has-text-weight-light'>
                          4,000
                        </h3>

                        <span
                          to={link}
                          className='is-block package-list-item--challenges-link'
                        >
                          2 challenges
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }
        }
      </Query>
    )
  }
})
