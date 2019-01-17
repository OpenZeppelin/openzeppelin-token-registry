import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CodeSnippet } from '~/components/CodeSnippet'
import { ChallengeRow } from '~/components/packages/ChallengeRow'
import { GitHubLink } from '~/components/GitHubLink'
import { LevelVouch } from '~/components/LevelVouch'
import OpenZeppelinEthLogo from '~/assets/images/openzeppelin-eth-logo.svg'

export class PackageDetails extends PureComponent {
  static propTypes = {
    metadata: PropTypes.object.isRequired
  }

  render () {
    const { metadata, vouching } = this.props

    return (
      <div>
        <div className='columns reverse-column-order'>
          <div className='column is-6-widescreen'>
            <h1 className='title is-size-1 has-text-weight-normal'>
              {metadata.name}

              <span className='package-item--version has-text-grey has-text-weight-light'>
                v{metadata.version}
              </span>
            </h1>

            <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
              Maintained by <a href='https://etherscan.com/address/0xf19b...34'>0xf19b...34</a>
            </h6>

            <p className='is-size-6 package-item--description'>
              {metadata.description}
            </p>

            <CodeSnippet metadata={metadata} />

            <GitHubLink url='https://github.com/DeltaCamp/zeppelin-vouching-app' />
          </div>

          <div className='column is-6-widescreen has-text-right--desktop'>
            <OpenZeppelinEthLogo />

            <br />
            <br />

            <button
              className='button is-dark is-pill'
            >
              Vouch
            </button>
          </div>
        </div>

        <hr />

        <div className='columns'>
          <div className='column is-6-widescreen'>
            <h5 className='is-size-5 has-text-weight-semibold'>
              3 addresses vouched 3,000 ZEP
            </h5>

            <div className="level--wrapper">
              <LevelVouch address='0x32Be343B94f860124dC4fEe278FDCBD38C102D88' amount='7000' />
              <LevelVouch address='0xa786bc5f76a5bce6d7108a7bc7a3f4a786a786bc' amount='2200' />
              <LevelVouch address='0x5f76a567abedf7faf8a4f83af7a3f4a786a67999' amount='800' />
            </div>

          </div>
        </div>

        <div className='columns'>
          <div className='column is-12-widescreen'>
            <h5 className='is-size-5 has-text-weight-semibold'>
              Challenges
            </h5>

            <div>
              Create a challenge by running: &nbsp;
              <br className="is-hidden-desktop" />
              <br className="is-hidden-desktop" />
              <CodeSnippet metadata={metadata} action='challenge' />
              <br className="is-hidden-desktop" />
              <br className="is-hidden-desktop" />
            </div>

            <br />

            <div className="table--wrapper">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th width="61%">
                      Name
                    </th>
                    <th width="12%">
                      Status
                    </th>
                    <th width="12%">
                      Severity
                    </th>
                    <th width="12%">
                      Bounty
                    </th>
                    <th width="3%">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    vouching.Challenged.map(challenged =>
                      <ChallengeRow challenged={challenged} key={challenged.returnValues._challengeID} />
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
