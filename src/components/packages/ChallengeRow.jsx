import React from 'react'
import gh from 'parse-github-url'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { GitHubLink } from '~/components/GitHubLink'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { VouchingQueries } from '~/queries/VouchingQueries'

const challengeMetadataQuery = gql`
  query ChallengeMetadata($uri: String!) {
    ...Metadata
  }
  ${VouchingQueries.Metadata}
`

export const ChallengeRow = ({ challenged }) => {
  const { amount, challengeURI } = challenged.returnValues
  const { repo } = gh(challengeURI)

  return (
    <Query query={challengeMetadataQuery} variables={{ uri: challengeURI }}>
      {({ data }) => {
        const { metadata } = data || {}
        return (
          <tr>
            <td>
              {metadata.description}
            </td>
            <td className="has-text-grey-light">
              Closed
            </td>
            <td className="has-text-danger">
              High
            </td>
            <td>
              {displayWeiToEther(amount)} Z
            </td>
            <td className="has-text-right">

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
