import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { CodeSnippet } from '~/components/CodeSnippet'
import ZeppelinOSLogo from '~/assets/images/zep-token-logo.svg'

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
    const { metadata } = this.props

    return (
      <div>
        <h1 className='title is-size-1 has-text-weight-normal'>
          {metadata.name}

          <span className="package-item--version has-text-grey has-text-weight-light">
            v{metadata.version}
          </span>
        </h1>

        <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
          Maintained by <a href="#">0xf19ea93b...34</a>
        </h6>

        <CodeSnippet metadata={metadata} />

        <button
          className="package-item--github-icon is-text button"
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
          4,000
        </h3>
      </div>
    )
  }
}
