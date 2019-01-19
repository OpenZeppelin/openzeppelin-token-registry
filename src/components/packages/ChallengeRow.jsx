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

  if (severityPercent >= 0.66 && severityPercent <= 1) {
    return 'High'
  } else if (severityPercent >= 0.33 && severityPercent < 0.66) {
    return 'Medium'
  } else {
    return 'Low'
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

  return (
    <Query query={challengeMetadataQuery} variables={{ uri: challengeURI }}>
      {({ data }) => {
        const { metadata } = data || {}
        return (
          <tr>
            <td>
              {get(metadata, 'description')}
            </td>
            <td className={`has-text-${statusColor}`}>
              {status}
            </td>
            <td className={`has-text-${priorityColor}`}>
              {priority}
            </td>
            <td>
              {displayWeiToEther(amount)} Z
            </td>
            <td className='has-text-right'>
              <GitHubLink
                url={`https://github.com/${repo}`}
                cssClassNames='icon-small'
              />
            </td>
          </tr>
        )
      }}
    </Query>
  )
}
