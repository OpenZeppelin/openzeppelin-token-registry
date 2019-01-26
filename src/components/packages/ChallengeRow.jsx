import React from 'react'
import { ethers } from 'ethers'
import gh from 'parse-github-url'
import { Query } from 'react-apollo'
import { get } from 'lodash'
import { GitHubLink } from '~/components/GitHubLink'
import { metadataQueries } from '~/queries/metadataQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
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

export const ChallengeRow = ({ packageTotalVouched, challenged }) => {
  const amount = ethers.utils.bigNumberify(challenged.parsedLog.values.amount.toString())
  const { challengeURI } = challenged.parsedLog.values
  const { repo } = gh(challengeURI)

  const status = (Math.random() > 0.5)
    ? constants.CHALLENGE_STATUS_OPEN
    : constants.CHALLENGE_STATUS_CLOSED
  const priority = displayPriority(packageTotalVouched, amount)

  const statusColor = constants.CHALLENGE_STATUS_COLORS[status]
  const priorityColor = constants.CHALLENGE_PRIORITY_COLORS[priority]

  const handleChallengeRowClick = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Query query={metadataQueries.challengeMetadataQuery} variables={{ uri: challengeURI }}>
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
