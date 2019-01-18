import React from 'react'
import gh from 'parse-github-url'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { get } from 'lodash'
import { VouchingQueries } from '~/queries/VouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { GitHubLink } from '~/components/GitHubLink'

const STATUS_COLORS = {
  'Open': 'success',
  'Closed': 'grey'
}

const PRIORITY_COLORS = {
  'Low': 'info',
  'Medium': 'warning',
  'High': 'danger'
}

const challengeMetadataQuery = gql`
  query ChallengeMetadata($uri: String!) {
    ...Metadata
  }
  ${VouchingQueries.Metadata}
`

export const ChallengeRow = ({ challenged }) => {
  const { amount, challengeURI } = challenged.returnValues
  const { repo } = gh(challengeURI)

  var status = 'Open'
  var priority = 'Low'

  const statusColor = STATUS_COLORS[status]
  const priorityColor = PRIORITY_COLORS[priority]

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
