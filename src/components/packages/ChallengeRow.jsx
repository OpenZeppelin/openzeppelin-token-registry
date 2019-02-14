import React, { Component } from 'react'
import classnames from 'classnames'
import gql from 'graphql-tag'
import AntdIcon from '@ant-design/icons-react'
import { MinusCircleOutline, PlusCircleOutline } from '@ant-design/icons'
import { ethers } from 'ethers'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'
import { CodeSnippet } from '~/components/CodeSnippet'
import { ResearcherLink } from '~/components/ResearcherLink'
import { GitHubLink } from '~/components/GitHubLink'
import { ShortText } from '~/components/ShortText'
import { vouchingFragments } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { challengeStatus } from '~/utils/challengeStatus'
import { dateRelative } from '~/utils/dateRelative'
import * as constants from '~/constants'

export const challengeRowQuery = gql`
  query challengeRowQuery($challengeId: String!, $uri: String!) {
    metadata(uri: $uri) @client {
      id
      title
      body
      htmlUrl: html_url
      url
    }
    Vouching @contract(type: "Challenge", id: $challengeId) {
      ...challengeFragment
    }
  }
  ${vouchingFragments.metadataFragment}
  ${vouchingFragments.challengeFragment}
`

export const ChallengeRow = class extends Component {
  state = {
    challengeDetailsActive: false,
    challengeRowHovered: false
  }

  constructor (props) {
    super(props)

    this.rowElementRef = React.createRef()
  }

  displayPriority = (amount) => {
    const packageAmount = displayWeiToEther(this.props.packageTotalVouched)
    const challengeAmount = displayWeiToEther(amount)
    const severityPercent = challengeAmount / packageAmount

    if (severityPercent >= 0.66) {
      return constants.CHALLENGE_PRIORITY_HIGH
    } else if (severityPercent >= 0.33 && severityPercent < 0.66) {
      return constants.CHALLENGE_PRIORITY_MEDIUM
    } else {
      return constants.CHALLENGE_PRIORITY_LOW
    }
  }

  handleChallengeRowMouseOver = (e) => {
    this.setState({ challengeRowHovered: true })
  }

  handleChallengeRowMouseLeave = (e) => {
    this.setState({ challengeRowHovered: false })
  }

  handleChallengeRowClick = (e) => {
    // also settings the *RowHovered to the same state as *DetailsActive fixes a touch / mobile bug
    this.setState({
      challengeDetailsActive: !this.state.challengeDetailsActive,
      challengeRowHovered: !this.state.challengeDetailsActive
    }, () => {
      if (window && this.state.challengeDetailsActive) {
        this.rowElementRef.current.scrollIntoView()
      }
    })
  }

  render () {
    const { challenged } = this.props
    const challengeId = challenged.parsedLog.values.challengeID
    const amount = ethers.utils.bigNumberify(challenged.parsedLog.values.amount.toString())

    const { metadataURI } = challenged.parsedLog.values

    const priority = this.displayPriority(amount)

    return (
      <Query query={challengeRowQuery} variables={{ uri: metadataURI, challengeId }}>
        {({ data, loading, error }) => {
          if (loading) return null
          if (error) return error.toString()

          const { challenge, appeal } = data.Vouching

          const status = challengeStatus(challenge.answer, !appeal.amount.eq(0), challenge.resolution)
          const statusLabel = constants.CHALLENGE_STATUS_LABEL[status]
          const priorityColor = constants.CHALLENGE_PRIORITY_COLORS[priority]

          const { metadata } = data || {}
          const { title, htmlUrl } = metadata
          const hasAnswer = parseInt(challenge.answeredAt, 10) > 0
          const hasAppeal = parseInt(appeal.createdAt, 10) > 0

          const defaultButtonClasses = 'list__wrapping-anchor list__has-padding no-scale'

          const ListCellButton = ({ children, extraClassNames }) => {
            return (
              <button
                onMouseEnter={this.handleChallengeRowMouseOver}
                onMouseLeave={this.handleChallengeRowMouseLeave}
                onClick={this.handleChallengeRowClick}
                className={`${defaultButtonClasses} ${extraClassNames}`}
              >
                {children}
              </button>
            )
          }

          return (
            <>
              <li
                ref={this.rowElementRef}
                className={classnames(
                  'list--row',
                  'list--row_challenge',
                  {
                    'list--row__hovered': this.state.challengeRowHovered,
                    'is-active': this.state.challengeDetailsActive
                  }
                )
                }>
                <span className='list--cell desc'>
                  <ListCellButton>
                    <ShortText text={title} />
                  </ListCellButton>
                </span>
                <span className={`list--cell status has-text-${statusLabel.colour}`}>
                  <ListCellButton>
                    {statusLabel.label}
                  </ListCellButton>
                </span>
                <span className={`list--cell severity has-text-${priorityColor}`}>
                  <ListCellButton>
                    {priority}
                  </ListCellButton>
                </span>
                <span className='list--cell bounty'>
                  <ListCellButton>
                    {displayWeiToEther(amount)} Z
                  </ListCellButton>
                </span>
                <span className='list--cell github'>
                  <GitHubLink
                    url={htmlUrl}
                    cssClassNames={defaultButtonClasses}
                  />
                </span>
                <span className='list--cell more'>
                  <ListCellButton
                    extraClassNames='has-text-centered list--accordion-icon is-monospaced has-text-grey is-uppercase'
                  >
                    <span className={classnames(
                      {
                        'has-text-link': this.state.challengeRowHovered
                      }
                    )}> { this.state.challengeDetailsActive ? 'Close' : 'Open' }</span> <AntdIcon
                      type={this.state.challengeDetailsActive ? MinusCircleOutline : PlusCircleOutline}
                      className='antd-icon'
                    />
                  </ListCellButton>
                </span>
              </li>
              <CSSTransition
                timeout={600}
                classNames='accordion'
                in={this.state.challengeDetailsActive}
              >
                {state => (
                  <li className='accordion accordion--panel'>
                    <span className='accordion--header'>
                      <h5 className='is-size-5'>
                        Challenged <span className='has-text-weight-semibold'>{dateRelative(challenge.createdAt)}</span>
                        {/* TODO: Could be nice to have a unique challengeId Challenge #{challenge.entryID.toString()} */}
                      </h5>
                      <h6 className='is-size-6 has-text-weight-semibold'>
                        Challenger <ResearcherLink address={challenge.challenger.toString()} shorten />
                      </h6>

                    </span>

                    <span className='accordion--column accordion--column__1'>
                      {hasAnswer ? (
                        <>
                          <h6 className='is-size-6 has-text-weight-semibold'>
                            <strong>Answer:</strong> {constants.CHALLENGE_ANSWER_LABEL[challenge.answer]}
                          </h6>
                          <h6 className='is-size-6 has-text-weight-semibold'>
                            <strong>Answered:</strong> <span className='has-text-grey'>{dateRelative(challenge.answeredAt)}</span>
                          </h6>
                          <br />
                          <h6 className='is-size-6 has-text-weight-semibold'>
                            <strong>Resolution:</strong> {constants.CHALLENGE_RESOLUTION_LABEL[challenge.resolution]}
                          </h6>
                        </>
                      ) : (
                        <span className='accordion--column__blank-state is-size-6'>
                          Currently no responses. Respond with:
                          <br />
                          <CodeSnippet snippet='zos challenge fail' />
                        </span>
                      )}
                    </span>

                    <span className='accordion--column accordion--column__2'>
                      {hasAppeal ? (
                        <>
                          <h6 className='is-size-6 has-text-weight-semibold'>
                            <strong>Appealer:</strong> <ResearcherLink address={challenge.challenger.toString()} shorten />
                          </h6>
                          <h6 className='is-size-6 has-text-weight-semibold'>
                            <strong>Appealed:</strong> <span className='has-text-grey'>{dateRelative(appeal.createdAt)}</span>
                          </h6>
                          <h6 className='is-size-6 has-text-weight-semibold'>
                            <strong>Appeal Amount:</strong> <span className='has-text-grey'>{displayWeiToEther(appeal.amount.toString())} Z</span>
                          </h6>
                        </>
                      ) : (
                        <span className='accordion--column__blank-state is-size-6'>
                          Currently no appeals. Appeal with:
                          <br />
                          <CodeSnippet snippet='zos challenge appeal' />
                        </span>
                      )}
                    </span>

                    <span className='accordion--footer'>
                      <GitHubLink
                        url={htmlUrl}
                        viewLink
                        cssClassNames='is-text'
                      />
                    </span>

                  </li>
                )}
              </CSSTransition>
            </>
          )
        }}
      </Query>
    )
  }
}
