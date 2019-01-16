import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { CodeSnippet } from '~/components/CodeSnippet'
import ZeppelinOSLogo from '~/assets/images/zep-token-logo.svg'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import get from 'lodash.get'

export class PackageDetails extends PureComponent {
  static propTypes = {
    metadata: PropTypes.object.isRequired
  }

  handleGitHubLinkClick = (url) => {
    if (window) {
      window.location.href = url
    }
  }

  render () {
    const { metadata, vouching } = this.props

    return (
      <div>
        <h4 className='title is-size-4'>
          {metadata.name}

          <span className="package-list-item--version has-text-grey has-text-weight-light">
            v{metadata.version}
          </span>
        </h4>

        <CodeSnippet metadata={metadata} />

        <button
          className="package-list-item--github-icon is-text button"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()

            // this should be coming from the json data
            const url = "https://github.com/DeltaCamp/zeppelin-vouching-app"

            this.handleGitHubLinkClick(url)
          }}
        >
          <AntdIcon type={GithubFill} className="antd-icon" />
        </button>

        <hr />

        <h6 className='subtitle is-size-7 package-list-item--subtitle is-monospaced'>
          VOUCHED
        </h6>

        <span className='is-inline-block'>
          <ZeppelinOSLogo width='20' height='20' className='package-list-item--zep-token-logo' />
        </span>

        <h3 className='is-inline-block is-size-3 has-text-weight-light'>
          {displayWeiToEther(get(vouching, 'totalVouched'))}
        </h3>
      </div>
    )
  }
}
