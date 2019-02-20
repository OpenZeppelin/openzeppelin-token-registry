import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gh from 'parse-github-url'
import yn from 'yn'
import classnames from 'classnames'
import { mixpanel } from '~/mixpanel'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'
import { ZosCodeSnippet } from '~/components/ZosCodeSnippet'
import { ResearcherLink } from '~/components/ResearcherLink'
import { GitHubLink } from '~/components/GitHubLink'
import { GithubProfileImage } from '~/components/GithubProfileImage'
import { ChallengeHeaderRow } from '~/components/challenges/ChallengeHeaderRow'
import { ChallengeRow } from '~/components/challenges/ChallengeRow'
import { VouchButton } from '~/components/packages/VouchButton'
import { VouchRow } from '~/components/packages/VouchRow'
import { challengeProjection } from '~/projections/challengeProjection'
import { projectPackageEvents } from '~/projections/projectPackageEvents'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'

export class PackageDetails extends Component {
  state = { voted: false }

  static propTypes = {
    metadata: PropTypes.object.isRequired,
    vouching: PropTypes.object.isRequired,
    registeredEvent: PropTypes.object.isRequired
  }

  handleVoteClick = (answer, packageName, packageId) => {
    mixpanel().track('vote', {
      answer,
      packageName,
      packageId: packageId.toString()
    })

    this.setState({ voted: { answer } })
  }

  render () {
    const { metadata, vouching, registeredEvent } = this.props
    const { parsedLog } = registeredEvent || {}
    const { values } = parsedLog || {}
    const githubDetails = gh(values.metadataURI || '')
    const { owner, repo } = githubDetails
    const { id } = values || {}
    const challenges = challengeProjection(vouching.allEvents)
    const noChallenges = challenges.length === 0

    const { name } = metadata || {}

    return (
      <>
        <div className='row reverse-column-order'>
          <div className='col-xs-12 col-md-7'>
            <h1 className='title is-size-1 has-text-weight-normal'>
              {name}

              <span className='package-item--version has-text-grey has-text-weight-light'>
                v{metadata.version}
              </span>
            </h1>

            <h6 className='is-size-6 has-text-weight-semibold package-item--maintained-by'>
              Maintained by <ResearcherLink address={values.owner} shorten />
            </h6>

            <p className='is-size-6 package-item--description'>
              {metadata.description}
            </p>
          </div>

          <div className='col-xs-12 col-start-md-8 col-md-5 has-text-right--desktop'>
            <div className='package-item--image'>
              <GithubProfileImage user={owner} />
            </div>

            {yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
              <VouchButton packageId={id} />
            )}
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <h5 className='is-size-5'>
              Link this package:
            </h5>
            <div className='code-wrapper'>
              <ZosCodeSnippet packageName={name} />
              <GitHubLink
                url={`https://github.com/${repo}`}
                viewLink
                cssClassNames='is-text has-extra-margin'
              />
            </div>
          </div>
        </div>

        <br />

        {!yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
          <>
            <div className='row'>
              <div className='col-xs-12'>
                <div className={classnames(
                  'message',
                  'message-vouch',
                  {
                    'has-voted': this.state.voted
                  }
                )}>

                  <CSSTransition
                    timeout={1000}
                    classNames='slide'
                    in={!this.state.voted}
                  >
                    {state => (
                      <div className='message-body message--cta has-text-centered slide-exit message-vouch--question'>
                        <p className='message-body--text'>
                          Would you vouch for this package?
                        </p>
                        <button
                          className='button is-purple is-pill button-left'
                          onClick={(e) => { this.handleVoteClick('yes', name, id) }}
                        >
                            Yes
                        </button>

                        <button
                          className='button is-pill button-right'
                          onClick={(e) => { this.handleVoteClick('no', name, id) }}
                        >
                            No
                        </button>
                      </div>
                    )}
                  </CSSTransition>

                  <CSSTransition
                    timeout={1000}
                    classNames='slide'
                    in={this.state.voted && this.state.voted.answer === 'yes'}
                  >
                    {state => (
                      <div className='message-body message--cta has-text-centered slide-enter message-vouch--positive-answer'>
                        <p className='message-body--text has-text-grey'>
                          Thanks for your feedback. We are testing token mechanics with our ZEP token to incentivize and secure EVM packages.
                          &nbsp;<a
                            href='https://docs.zeppelinos.org/docs/vouching.html'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='has-text-link has-hover-border'
                          >Click here to learn more about our vouching mechanics and private beta.</a>
                        </p>
                      </div>
                    )}
                  </CSSTransition>

                  <CSSTransition
                    timeout={1000}
                    classNames='slide'
                    in={this.state.voted && this.state.voted.answer === 'no'}
                  >
                    {state => (
                      <div className='message-body message--cta has-text-centered slide-enter message-vouch--negative-answer'>
                        <p className='message-body--text has-text-grey'>
                          Thank you for your feedback. Your feedback will be used to inform the rankings of EVM packages.
                        </p>
                      </div>
                    )}
                  </CSSTransition>

                </div>
              </div>
            </div>

            <br />
          </>
        )}

        {yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (

          <div className='row'>
            <div className='col-xs-12'>
              <Query query={vouchingQueries.vouchQuery} variables={{ id: id.toString() }}>
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
                        {vouches.length} {vouches.length === 1 ? 'address' : 'addresses'} vouched {displayWeiToEther(vouching.entry.totalVouched)} ZEP
                      </h5>

                      <div className='list--wrapper'>
                        <ul className='list is-fullwidth'>
                          <li className='list--row list--row__head list--row__three-column'>
                            <span className='list--cell list--cell__head'>
                              Address
                            </span>
                            <span className='list--cell list--cell__head'>
                              Vouched
                            </span>
                            <span className='list--cell list--cell__head' />
                          </li>
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

        <br />

        {yn(process.env.REACT_APP_NEXT_RELEASE_FEATURE_FLAG) && (
          <div className='row'>
            <div className='col-xs-12'>
              <h5 className='is-size-5 has-text-weight-semibold'>
                Challenges
              </h5>

              {!noChallenges &&
                <>
                  Create a challenge by running: &nbsp;
                  <br className='is-hidden-desktop' />
                  <br className='is-hidden-desktop' />
                  <ZosCodeSnippet packageName={name} action='challenge' />
                  <br className='is-hidden-desktop' />
                  <br className='is-hidden-desktop' />
                </>
              }

              <br />
              <br />

              <ul className='list'>
                <ChallengeHeaderRow />
                {
                  challenges.map(challenged =>
                    <ChallengeRow
                      packageTotalVouched={vouching.entry.totalVouched}
                      challenged={challenged}
                      key={challenged.parsedLog.values.challengeID.toString()}
                    />
                  )
                }
                {noChallenges &&
                <li className='list--row list--row__blank-state'>
                  <span className='list--cell list--cell__blank-state'>
                        There are currently no challenges. Create a challenge by running: &nbsp;
                    <br />
                    <br />
                    <ZosCodeSnippet packageName={name} action='challenge' />
                  </span>
                </li>
                }
              </ul>
            </div>
          </div>
        )
        }

      </>
    )
  }
}
