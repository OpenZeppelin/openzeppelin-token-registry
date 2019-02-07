import React, { Component } from 'react'
import gh from 'parse-github-url'
import gql from 'graphql-tag'
import { ethers } from 'ethers'
import { get } from 'lodash'
import { Query } from 'react-apollo'
import { CSSTransition } from 'react-transition-group'
import { GitHubLink } from '~/components/GitHubLink'
import { vouchingFragments } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { challengeStatus } from '~/utils/challengeStatus'
import * as constants from '~/constants'

export const challengeRowQuery = gql`
  query challengeRowQuery($challengeId: String!, $uri: String!) {
    metadata(uri: $uri) @client {
      ...md
    }
    Vouching @contract(type: "Challenge", id: $challengeId) {
      ...challengeFragment
    }
  }
  ${vouchingFragments.metadataFragment}
  ${vouchingFragments.challengeFragment}
`

export const ChallengeRow = class extends Component {
  state = { challengeDetailsActive: false }

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

  render() {
    const { challenged } = this.props
    const challengeId = challenged.parsedLog.values.challengeID
    const amount = ethers.utils.bigNumberify(challenged.parsedLog.values.amount.toString())
    const { metadataURI } = challenged.parsedLog.values
    const { repo } = gh(metadataURI)

    const priority = this.displayPriority(amount)

    const handleChallengeRowClick = (e) => {
      e.preventDefault()
      this.setState({ challengeDetailsActive: !this.state.challengeDetailsActive })
    }

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
          return (
            <>
              <li className='list--row list--row_challenge'>
                <span className='list--cell'>
                  <button
                    onClick={handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {get(metadata, 'description')}
                  </button>
                </span>
                <span className={`list--cell has-text-${statusLabel.colour}`}>
                  <button
                    onClick={handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {statusLabel.label}
                  </button>
                </span>
                <span className={`list--cell has-text-${priorityColor}`}>
                  <button
                    onClick={handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {priority}
                  </button>
                </span>
                <span className='list--cell'>
                  <button
                    onClick={handleChallengeRowClick}
                    className='list__wrapping-anchor list__has-padding no-scale'
                  >
                    {displayWeiToEther(amount)} Z
                  </button>
                </span>
                <span className='list--cell has-text-right'>
                  <GitHubLink
                    url={`https://github.com/${repo}`}
                    cssClassNames='list__wrapping-anchor no-scale'
                  />
                </span>

              </li>
              <CSSTransition
                timeout={600}
                classNames='accordion'
                in={this.state.challengeDetailsActive}
              >
                {state => (
                  <li className="accordion">
                    <span>Hello</span>
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
