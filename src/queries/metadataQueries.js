import gql from 'graphql-tag'
import { vouchingFragments } from '~/queries/vouchingQueries'

export const metadataQueries = {
  challengeMetadataQuery: gql`
    query ChallengeMetadata($uri: String!) {
      ...Metadata
    }
    ${vouchingFragments.metadataFragment}
  `,
  webpageImageQuery: gql`
    query webpageImageQuery($uri: String!) {
      metadata(uri: $uri) @client {
        id
        avatar_url
      }
    }
  `
}
