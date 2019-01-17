import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// import { get } from 'lodash'
// Can we map a reasearcher to a github (or gitlab, etc) profile?
// import AntdIcon from '@ant-design/icons-react'
// import { GithubFill } from '@ant-design/icons'
// import { formatRoute } from 'react-router-named-routes'
// import { Redirect, Link } from 'react-router-dom'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import ZepTokenLogo from '~/assets/images/zep-token-logo.svg'
// import * as routes from '~/../config/routes'

export const ResearchersListItem = ReactTimeout(class _ResearchersListItem extends PureComponent {
  state = {}

  static propTypes = {
    researcher: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.setTimeout(() => {
      this.setState({ startAnimating: true })
    }, 20)
  }
  //
  // handleGitHubLinkClick = (url) => {
  //   if (window) {
  //     window.location.href = url
  //   }
  // }

  render () {
    // const { metadata, Vouching } = data
    // const { version } = metadata || {}
    // const { Challenged } = Vouching || {}

    // const id = parseInt(this.props.researcher.id, 10)
    // const link = formatRoute(routes.PACKAGE_ITEM, { id, version })

    // const { repo } = gh(this.props.researcher.metadataURI)

    // if (this.state.toResearcher) {
    //   return <Redirect to={link} />
    // }

    // var challengeCount = 0
    // if (Challenged) {
    //   challengeCount = Challenged.length
    // }
    //
    // var challenges
    // if (challengeCount === 0) {
    //   challenges = <span>No challenges</span>
    // } else if (challengeCount === 1) {
    //   challenges = <span>1 challenge</span>
    // } else {
    //   challenges = <span>{challengeCount} challenges</span>
    // }

    return (
      <div
        className={
          classnames(
            'list-item',
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
        <div className='panel-block'>
          <h6 className='is-size-6 has-text-weight-bold is-monospaced has-text-grey list-item--subtitle__with-margin'>
            RESEARCHER ADDRESS
          </h6>
          <h5 className='title is-size-5 is-monospaced'>
            <EtherscanAddressLink address={this.props.researcher.address}>{this.props.researcher.address}</EtherscanAddressLink>
          </h5>

          <br />

          <h6 className='is-size-6 has-text-weight-bold is-monospaced has-text-grey'>
            TOTAL VOUCHED
          </h6>
          <h3 className='is-size-3 is-monospaced'>
            <span className='item--version has-text-grey has-text-weight-light'>
              <ZepTokenLogo width='20' height='20' /> {displayWeiToEther(this.props.researcher.amount)}
            </span>
          </h3>
        </div>
      </div>
    )
  }
})
