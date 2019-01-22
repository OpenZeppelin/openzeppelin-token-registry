import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gh from 'parse-github-url'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { CodeSnippet } from '~/components/CodeSnippet'
import { ChallengeRow } from '~/components/packages/ChallengeRow'
import { GitHubLink } from '~/components/GitHubLink'
import { LevelVouch } from '~/components/LevelVouch'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { projectPackageEvents } from '~/projections/projectPackageEvents'
import { GithubProfileImage } from '~/components/GithubProfileImage'
import { shortenAddress } from '~/utils/shortenAddress'
import { toWei } from '~/utils/toWei'

const vouchesQuery = gql`
  query vouchesQuery($id: String!) {
    Vouching @contract {
      allEvents @pastEvents(filter: { id: $id }, fromBlock: "0", toBlock: "latest")
    }
  }
`

const SEND_VOUCH_TRANSACTION = gql`
  mutation SendTransaction($web3Call: Object!) {
    sendTransaction(web3Call: $web3Call) @client
  }
`

export class PackageDetails extends Component {
  state = {}

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
            <div className='package-item--image'>
              <GithubProfileImage user={owner} />
            </div>
            <button
              className='button is-dark is-pill'
            >
              Vouch
            </button>

            <input name="amount" onChange={(e) => {
              const method = 'vouch'
              const amount = toWei(e.target.value)
              const args = [id, amount]
              const web3Call = { method, args }

              this.setState({ web3Call })
            }} />

            <Mutation mutation={SEND_VOUCH_TRANSACTION} variables={{
              web3Call: this.state.web3Call
            }}>
              {sendTransaction => (
                <button
                  onClick={sendTransaction}
                  style={{
                    'fontSize': 20
                  }}
                  className="button is-info"
                >
                  Send
                </button>
              )}
            </Mutation>

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

                    <div className='level--wrapper'>
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
              <br className='is-hidden-desktop' />
              <br className='is-hidden-desktop' />
              <CodeSnippet metadata={metadata} action='challenge' />
              <br className='is-hidden-desktop' />
              <br className='is-hidden-desktop' />
            </div>

            <br />

            <div className='list--wrapper'>
              <ul className='list is-fullwidth'>
                <li className='list--row list--row_challenge'>
                  <span className="list--cell list--header">
                    Name
                  </span>
                  <span className="list--cell list--header">
                    Status
                  </span>
                  <span className="list--cell list--header">
                    Severity
                  </span>
                  <span className="list--cell list--header">
                    Bounty
                  </span>
                  <span className="list--cell list--header" />
                </li>
                {
                  vouching.Challenged.map(challenged =>
                    <ChallengeRow
                      packageTotalVouched={vouching.totalVouched}
                      challenged={challenged}
                      key={challenged.returnValues._challengeID}
                    />
                  )
                }
                {vouching.Challenged.length === 0 &&
                  <li>
                    <span>No challenges have been made</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
