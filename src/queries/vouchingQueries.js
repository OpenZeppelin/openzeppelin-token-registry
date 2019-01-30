import gql from 'graphql-tag'

export const vouchingFragments = {
  metadataFragment: gql`
    fragment md on Metadata {
      metadata(uri: $uri) @client {
        id
        __typename
        name
        version
        description
      }
    }
  `,
  packageFragment: gql`
    fragment packageFragment on Package {
      id
      __typename
      totalVouched(id: $id)
      allEvents @pastEvents(filter: { id: $id }, fromBlock: 0, toBlock: "latest")
    }
  `
}

export const vouchingQueries = {
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
        registeredEvents: Registered @pastEvents(fromBlock: 0, toBlock: "latest")
      }
    }
  `,
  packageQuery: gql`
    query packageQuery($uri: String!, $id: String!) {
      ...md
      Vouching @contract(type: "Package", id: $id) {
        ...packageFragment
      }
    }
    ${vouchingFragments.metadataFragment}
    ${vouchingFragments.packageFragment}
  `
}
