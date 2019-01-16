import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { CodeSnippet } from '~/components/CodeSnippet'
import ZepTokenLogo from '~/assets/images/zep-token-logo.svg'

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
        <div className='columns'>
          <div className='column is-6-widescreen'>
            <h1 className='title is-size-1 has-text-weight-normal'>
              {metadata.name}

              <span className='package-item--version has-text-grey has-text-weight-light'>
                v{metadata.version}
              </span>
            </h1>

            <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
              Maintained by <a href='#'>0xf19b...34</a>
            </h6>

            <p className='is-size-6 package-item--description'>
              {metadata.description}
            </p>

            <CodeSnippet metadata={metadata} />

            <button
              className='package-item--github-icon is-text button'
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

          <div className='column is-6-widescreen has-text-right'>
            <img src='https://openzeppelin.org/img/openzeppelin-logo.svg' />

            <br />
            <br />

            <button
              className='button is-dark is-pill'
            >
              Vouch
            </button>
          </div>
        </div>

        <div className='columns'>
          <div className='column is-12-widescreen'>
            <hr />

            <h5 className='is-size-5 has-text-weight-semibold'>
              3 addresses vouched 3,000 ZEP
            </h5>

            <ul className='list--vouched'>
              <li>
                0x32Be343B94f860124dC4fEe278FDCBD38C102D88 <ZepTokenLogo width='20' height='20' className='package-list-item--zep-token-logo' /> 7,000
              </li>
            </ul>

            <p>
            </p>


            <h3 className='is-inline-block is-size-3 has-text-weight-light'>
              4,000
            </h3>
          </div>
        </div>
      </div>
    )
  }
}
