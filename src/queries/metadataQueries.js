import gql from 'graphql-tag'
import { vouchingFragments } from '~/queries/vouchingQueries'

export const metadataQueries = {
  challengeMetadataQuery: gql`
    query ChallengeMetadata($uri: String!) {
      ...md
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
