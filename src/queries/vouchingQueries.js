import gql from 'graphql-tag'

export const vouchingFragments = {
  metadataFragment: gql`
    fragment md on Metadata {
      id
      __typename
      name
      version
      description
    }
  `,
  packageFragment: gql`
    fragment packageFragment on Package {
      id
      __typename
      entry: getEntry(id: $id)
      allEvents @pastEvents(extraTopics: { types: ["uint256"], values: [$id] })
    }
  `,
  challengeFragment: gql`
    fragment challengeFragment on Challenge {
      id
      __typename
      challenge: getChallenge(id: $challengeId)
      appeal: getAppeal(id: $challengeId)
    }
  `
}

export const vouchingQueries = {
  vouchesQuery: gql`
    query vouchesQuery {
      Vouching @contract {
        allEvents @pastEvents(fromBlock: 0, toBlock: "latest")
      }
    }
  `,
  vouchQuery: gql`
    query vouchQuery($id: String!) {
      Vouching @contract(type: "Package", id: $id) {
        ...packageFragment
      }
    }
    ${vouchingFragments.packageFragment}
  `,
  eventsQuery: gql`
    query eventsQuery {
      Vouching @contract(type: "GlobalInfo", id: "1") {
        id
        __typename
        Registered @pastEvents
      }
    }
  `,
  packageQuery: gql`
    query packageQuery($uri: String!, $id: String!) {
      metadata(uri: $uri) @client {
        ...md
      }
      Vouching @contract(type: "Package", id: $id) {
        ...packageFragment
      }
    }
    ${vouchingFragments.metadataFragment}
    ${vouchingFragments.packageFragment}
  `
}
