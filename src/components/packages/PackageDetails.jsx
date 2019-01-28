import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gh from 'parse-github-url'
import yn from 'yn'
import { Query } from 'react-apollo'
import { CodeSnippet } from '~/components/CodeSnippet'
import { EtherscanAddressLink } from '~/components/EtherscanAddressLink'
import { GitHubLink } from '~/components/GitHubLink'
import { GithubProfileImage } from '~/components/GithubProfileImage'
import { ChallengeRow } from '~/components/packages/ChallengeRow'
import { VouchButton } from '~/components/packages/VouchButton'
import { VouchRow } from '~/components/packages/VouchRow'
import { projectPackageEvents } from '~/projections/projectPackageEvents'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { shortenAddress } from '~/utils/shortenAddress'

export class PackageDetails extends Component {
  state = {}

  static propTypes = {
    metadata: PropTypes.object.isRequired,
    vouching: PropTypes.object.isRequired,
    registeredEvent: PropTypes.object.isRequired
  }

  render () {
    const { metadata, vouching, registeredEvent } = this.props
    const { parsedLog } = registeredEvent || {}
    const { values } = parsedLog || {}
    const githubDetails = gh(values.metadataURI || '')
    const { owner, repo } = githubDetails
    const { id } = values || {}
    const noChallenges = (vouching.Challenged.length === 0)

    return (
      <>
        <div className='columns reverse-column-order'>
          <div className='column is-6-widescreen'>
            <h1 className='title is-size-1 has-text-weight-normal'>
              {metadata.name}

              <span className='package-item--version has-text-grey has-text-weight-light'>
                v{metadata.version}
              </span>
            </h1>

            <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
              Maintained by <EtherscanAddressLink address={values.owner}>{shortenAddress(values.owner)}</EtherscanAddressLink>
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

            {yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
              <VouchButton packageId={id} />
            )}
          </div>
        </div>

        <hr />

        {yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
          <div className='columns'>
            <div className='column is-10-widescreen'>
              <Query query={vouchingQueries.vouchesQuery} variables={{ id }}>
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

                      <div className='list--wrapper'>
                        <ul className='list is-fullwidth'>
                          {vouches.map(vouch => {
                            return <VouchRow
                              address={vouch.address}
                              amount={vouch.amount}
                              key={vouch.address}
                            />
                          })}
                          {vouches.length === 0 &&
                            <li>
                              <span>No vouches have been made</span>
                            </li>
                          }
                        </ul>
                      </div>
                    </>
                  )
                }}
              </Query>
            </div>
          </div>
        )}

        {yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
          <div className='columns'>
            <div className='column is-12-widescreen'>
              <h5 className='is-size-5 has-text-weight-semibold'>
                Challenges
              </h5>

              {!noChallenges &&
                <div>
                  Create a challenge by running: &nbsp;
                  <br className='is-hidden-desktop' />
                  <br className='is-hidden-desktop' />
                  <CodeSnippet metadata={metadata} action='challenge' />
                  <br className='is-hidden-desktop' />
                  <br className='is-hidden-desktop' />
                </div>
              }

              <br />

              <div className='list--wrapper'>
                <ul className='list is-fullwidth'>
                  <li className='list--row list--row__head list--row_challenge'>
                    <span className="list--cell list--cell__head">
                      Name
                    </span>
                    <span className="list--cell list--cell__head">
                      Status
                    </span>
                    <span className="list--cell list--cell__head">
                      Severity
                    </span>
                    <span className="list--cell list--cell__head">
                      Bounty
                    </span>
                    <span className="list--cell list--cell__head" />
                  </li>
                  {
                    vouching.Challenged.map(challenged =>
                      <ChallengeRow
                        packageTotalVouched={vouching.totalVouched}
                        challenged={challenged}
                        key={challenged.parsedLog.values._challengeID}
                      />
                    )
                  }
                  {noChallenges &&
                    <li className='list--row list--row__blank-state'>
                      <span className="list--cell list--cell__blank-state">
                        There are currently no challenges. Create a challenge by running: &nbsp;
                        <br />
                        <br />
                        <CodeSnippet metadata={metadata} action='challenge' />
                      </span>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        )
      }

      </>
    )
  }
}
