import React from 'react'
import BN from 'bn.js'
import gh from 'parse-github-url'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { get } from 'lodash'
import { VouchingQueries } from '~/queries/VouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { GitHubLink } from '~/components/GitHubLink'
import * as constants from '~/constants'

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

const challengeMetadataQuery = gql`
  query ChallengeMetadata($uri: String!) {
    ...Metadata
  }
  ${VouchingQueries.Metadata}
`

export const ChallengeRow = ({ packageTotalVouched, challenged }) => {
  const amount = new BN(challenged.returnValues.amount)
  const { challengeURI } = challenged.returnValues
  const { repo } = gh(challengeURI)

  const status = (Math.random() > 0.5) ?
    constants.CHALLENGE_STATUS_OPEN :
    constants.CHALLENGE_STATUS_CLOSED
  const priority = displayPriority(packageTotalVouched, amount)

  const statusColor = constants.CHALLENGE_STATUS_COLORS[status]
  const priorityColor = constants.CHALLENGE_PRIORITY_COLORS[priority]

  const handleChallengeRowClick = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Query query={challengeMetadataQuery} variables={{ uri: challengeURI }}>
      {({ data }) => {
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
            <span className={`list--cell has-text-${statusColor}`}>
              <button
                onClick={handleChallengeRowClick}
                className='list__wrapping-anchor list__has-padding'
              >
                {status}
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
