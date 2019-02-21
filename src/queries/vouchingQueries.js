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
  entryFragment: gql`
    fragment entryFragment on Package {
      entry: getEntry(id: $id)
    }
  `,
  packageFragment: gql`
    fragment packageFragment on Package {
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
  researcherChallengesQuery: gql`
    query researcherChallengesQuery($address: String!) {
      Vouching @contract(type: "ResearcherChallengeEvents", id: $address) {
        Challenged @pastEvents(extraTopics: { types: ["uint256", "address", "address"], values: [null, null, $address] })
      }
    }
  `,
  researcherVouchesQuery: gql`
    query researcherVouchesQuery($address: String!) {
      Vouching @contract(type: "ResearcherEvents", id: $address) {
        allEvents @pastEvents(extraTopics: { types: ["uint256", "address"], values: [null, $address] })
      }
    }
  `,
  allEventsQuery: gql`
    query vouchesQuery {
      Vouching @contract(type: "AllEvents", id: "1") {
        id
        allEvents @pastEvents
      }
    }
  `,
  entryQuery: gql`
    query entryQuery($id: String!) {
      Vouching @contract(type: "Entry", id: $id) {
        id
        __typename
        ...entryFragment
      }
    }
    ${vouchingFragments.entryFragment}
  `,
  vouchQuery: gql`
    query vouchQuery($id: String!) {
      Vouching @contract(type: "Package", id: $id) {
        id
        __typename
        ...entryFragment
        ...packageFragment
      }
    }
    ${vouchingFragments.entryFragment}
    ${vouchingFragments.packageFragment}
  `,
  registeredEventsQuery: gql`
    query registeredEventsQuery {
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
        id
        __typename
        ...packageFragment
        ...entryFragment
      }
    }
    ${vouchingFragments.metadataFragment}
    ${vouchingFragments.packageFragment}
    ${vouchingFragments.entryFragment}
  `
}
