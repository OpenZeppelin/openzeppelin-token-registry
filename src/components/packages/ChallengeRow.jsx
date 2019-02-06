import React from 'react'
import { ethers } from 'ethers'
import gh from 'parse-github-url'
import { Query } from 'react-apollo'
import { get } from 'lodash'
import { GitHubLink } from '~/components/GitHubLink'
import { vouchingFragments } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import * as constants from '~/constants'
import gql from 'graphql-tag'
import { challengeStatus } from '~/utils/challengeStatus'

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

function displayPriority (packageTotalVouched, amount) {
  const packageAmount = displayWeiToEther(packageTotalVouched)
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

export const ChallengeRow = ({ packageTotalVouched, challenged }) => {
  const challengeId = challenged.parsedLog.values.challengeID
  const amount = ethers.utils.bigNumberify(challenged.parsedLog.values.amount.toString())
  const { metadataURI } = challenged.parsedLog.values
  const { repo } = gh(metadataURI)

  const priority = displayPriority(packageTotalVouched, amount)

  const handleChallengeRowClick = (e) => {
    e.preventDefault()
    console.log(e)
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
          <li className='list--row list--row_challenge'>
            <span className='list--cell'>
              <button
                onClick={handleChallengeRowClick}
                className='list__wrapping-anchor list__has-padding'
              >
                {get(metadata, 'description')}
              </button>
            </span>
            <span className={`list--cell has-text-${statusLabel.colour}`}>
              <button
                onClick={handleChallengeRowClick}
                className='list__wrapping-anchor list__has-padding'
              >
                {statusLabel.label}
              </button>
            </span>
            <span className={`list--cell has-text-${priorityColor}`}>
              <button
                onClick={handleChallengeRowClick}
                className='list__wrapping-anchor list__has-padding'
              >
                {priority}
              </button>
            </span>
            <span className='list--cell'>
              <button
                onClick={handleChallengeRowClick}
                className='list__wrapping-anchor list__has-padding'
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
        )
      }}
    </Query>
  )
}
