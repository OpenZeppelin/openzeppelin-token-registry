import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { get } from 'lodash'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { formatRoute } from 'react-router-named-routes'
import { Redirect, Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gh from 'parse-github-url'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { CodeSnippet } from '~/components/CodeSnippet'
import ZepTokenLogo from '~/assets/images/zep-token-logo.svg'
import * as routes from '~/../config/routes'
import { PackageListItemLoader } from '~/components/packages/PackageListItemLoader'

const packageQuery = gql`
  query packageQuery($uri: String!, $id: String!, $formattedId: String!) {
    metadata(uri: $uri) @client {
      name
      version
      description
    }
    Vouching @contract {
      totalVouched(id: $id)
      Challenged @pastEvents(filter: {id: $id}, fromBlock: "0", toBlock: "latest")
    }
  }
`

export const PackageListItem = ReactTimeout(class _PackageListItem extends PureComponent {
  state = {}

  static propTypes = {
    package: PropTypes.object.isRequired
  }

  componentDidMount () {
    // this.props.setTimeout(() => {
    //   this.setState({ startAnimating: true })
    // }, 0)
  }

  handleGitHubLinkClick = (url) => {
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
      <Query
        query={packageQuery}
        variables={{
          uri: this.props.package.metadataURI,
          id: this.props.package.id
        }}>
        {
          ({ loading, error, data }) => {
            if (loading) return <PackageListItemLoader />
            if (error) return `Error!: ${error}`

            this.props.setTimeout(() => {
              this.setState({ startAnimating: true })
            }, 20)

            const { metadata, Vouching } = data
            const { version } = metadata || {}
            const { Challenged } = Vouching || {}

            const id = parseInt(this.props.package.id, 10)
            const link = formatRoute(routes.PACKAGE_ITEM, { id, version })

            const { repo } = gh(this.props.package.metadataURI)

            if (this.state.toPackage) {
              return <Redirect to={link} />
            }

            let challengeCount = 0
            if (Challenged) {
              challengeCount = Challenged.length
            }

            let challenges
            if (challengeCount === 1) {
              challenges = <span>1 challenge</span>
            } else if (challengeCount > 1) {
              challenges = <span>{challengeCount} challenges</span>
            }

            return (
              <div
                className={
                  classnames(
                    'list-item',
                    'panel'
                  )
                }
              >
                <Link
                  to={link}
                  className='no-select'
                >
                  <div className='panel-block'>
                    <div className='columns'>
                      <div className='column is-three-quarters'>
                        <h4 className={classnames(
                          'title',
                          'is-size-4',
                          'has-text-weight-normal',
                          'fade-in',
                          'slide-up',
                          'medium',
                          {
                            'slide-up-enter': this.state.startAnimating,
                            'fade-in-enter': this.state.startAnimating
                          }
                        )}>
                          {get(metadata, 'name')}

                          <span className='package-item--version has-text-grey has-text-weight-light'>
                            v{get(metadata, 'version')}
                          </span>
                        </h4>

                        <CodeSnippet metadata={metadata || {}} />

                        <button
                          className={classnames(
                            'package-item--github-icon',
                            'is-text',
                            'button',
                            'fade-in',
                            'slide-up',
                            'medium',
                            {
                              'slide-up-enter': this.state.startAnimating,
                              'fade-in-enter': this.state.startAnimating
                            }
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()

                            // this should be coming from the json data
                            const url = `https://github.com/${repo}`

                            this.handleGitHubLinkClick(url)
                          }}
                        >
                          <AntdIcon type={GithubFill} className='antd-icon' />
                        </button>
                      </div>

                      <div className={classnames(
                        'column',
                        'has-text-right-desktop',
                        'fade-in',
                        'slide-up',
                        'medium',
                        {
                          'slide-up-enter': this.state.startAnimating,
                          'fade-in-enter': this.state.startAnimating
                        }
                      )}>
                        <h6 className='subtitle is-size-7 list-item--subtitle is-monospaced'>
                          VOUCHED
                        </h6>

                        <span className='is-inline-block'>
                          <ZepTokenLogo width='20' height='20' className='list-item--zep-token-logo' />
                        </span>

                        <h3 className='is-inline-block is-size-3 has-text-weight-light'>
                          {displayWeiToEther(get(Vouching, 'totalVouched'))}
                        </h3>

                        <span
                          to={link}
                          className='is-block list-item--challenges-link'
                        >
                          {challenges}
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
