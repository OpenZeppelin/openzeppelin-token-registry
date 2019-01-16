import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'
import { CodeSnippet } from '~/components/CodeSnippet'
import { LevelVouch } from '~/components/LevelVouch'

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
          <div className='column is-6-widescreen'>
            <hr />

            <h5 className='is-size-5 has-text-weight-semibold'>
              3 addresses vouched 3,000 ZEP
            </h5>

            <div class="level--wrapper">
              <LevelVouch address='0x32Be343B94f860124dC4fEe278FDCBD38C102D88' amount='7000' />
              <LevelVouch address='0xa786bc5f76a5bce6d7108a7bc7a3f4a786a786bc' amount='2200' />
              <LevelVouch address='0x5f76a567abedf7faf8a4f83af7a3f4a786a67999' amount='800' />
            </div>

          </div>
        </div>

        <br />

        <div className='columns'>
          <div className='column is-12-widescreen'>
            <h5 className='is-size-5 has-text-weight-semibold'>
              Challenges
            </h5>

            <p>
              Create a challenge by running: &nbsp;
              <CodeSnippet metadata={metadata} action='challenge' />
            </p>

            <br />

            <div className="table--wrapper">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Severity
                    </th>
                    <th>
                      Bounty
                    </th>
                    <th>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Name
                    </td>
                    <td>
                      Status
                    </td>
                    <td>
                      Severity
                    </td>
                    <td>
                      Bounty
                    </td>
                    <td>
                      Github Link
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
