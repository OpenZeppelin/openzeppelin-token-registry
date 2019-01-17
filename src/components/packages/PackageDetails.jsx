import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import gh from 'parse-github-url'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CodeSnippet } from '~/components/CodeSnippet'
import { ChallengeRow } from '~/components/packages/ChallengeRow'
import { GitHubLink } from '~/components/GitHubLink'
import { LevelVouch } from '~/components/LevelVouch'
import OpenZeppelinEthLogo from '~/assets/images/openzeppelin-eth-logo.svg'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { projectPackageEvents } from '~/projections/projectPackageEvents'
import { GithubProfileImage } from '~/components/GithubProfileImage'
import { shortenAddress } from '~/utils/shortenAddress'

const vouchesQuery = gql`
  query vouchesQuery($id: String!) {
    Vouching @contract {
      allEvents @pastEvents(filter: { id: $id }, fromBlock: "0", toBlock: "latest")
    }
  }
`

export class PackageDetails extends PureComponent {
  static propTypes = {
    metadata: PropTypes.object.isRequired,
    vouching: PropTypes.object.isRequired,
    registeredEvent: PropTypes.object.isRequired
  }

  render () {
    const { metadata, vouching, registeredEvent } = this.props
    const { returnValues } = registeredEvent || {}
    const githubDetails = gh(returnValues.metadataURI || '')
    const { owner, repo } = githubDetails
    const { id } = returnValues || {}

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
              Maintained by <EtherscanAddressLink address={returnValues.owner}>{shortenAddress(returnValues.owner)}</EtherscanAddressLink>
            </h6>

            <p className='is-size-6 package-item--description'>
              {metadata.description}
            </p>

            <CodeSnippet metadata={metadata} />

            <GitHubLink url={`https://github.com/${repo}`} />
          </div>

          <div className='column is-6-widescreen has-text-right--desktop'>
            <div className='package-details-image'>
              <GithubProfileImage user={owner} />
            </div>

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
            <Query query={vouchesQuery} variables={{ id }}>
              {({ data }) => {
                const { Vouching } = data || {}
                const { allEvents } = Vouching || {}
                const packageProjection = projectPackageEvents(allEvents || [])
                const { vouchTotals } = packageProjection.packages[id] || {}
                const addresses = Object.keys(vouchTotals || {})
                const vouches =
                  addresses.map(address =>
                    ({ address, amount: vouchTotals[address].toString() })
                  ).sort((a, b) => b.amount - a.amount)

                return (
                  <>
                    <h5 className='is-size-5 has-text-weight-semibold'>
                      {vouches.length} addresses vouched {displayWeiToEther(vouching.totalVouched)} ZEP
                    </h5>

                    <div className="level--wrapper">
                      {vouches.map(vouch => <LevelVouch address={vouch.address} amount={vouch.amount} key={vouch.address} />)}
                    </div>
                  </>
                )

              }}

            </Query>

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
