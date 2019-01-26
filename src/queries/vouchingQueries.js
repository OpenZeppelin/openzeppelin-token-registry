import gql from 'graphql-tag'

export const vouchingFragments = {
  challengedEventsFragment: gql`
    fragment ChallengedEvents on Vouching {
      Challenged @pastEvents(filter: {id: $id}, fromBlock: 0, toBlock: "latest")
    }
  `,
  metadataFragment: gql`
    fragment Metadata on Vouching {
      metadata(uri: $uri) @client {
        name
        version
        description
      }
    }
  `
}

export const vouchingQueries = {
  vouchesQuery: gql`
    query vouchesQuery($id: String!) {
      Vouching @contract {
        allEvents @pastEvents(filter: { id: $id }, fromBlock: 0, toBlock: "latest")
      }
    }
  `,
  eventsQuery: gql`
    query eventsQuery {
      Vouching @contract {
        registeredEvents: Registered @pastEvents(fromBlock: 0, toBlock: "latest")
      }
    }
  `,
  totalVouchesQuery: gql`
    query totalVouchesQuery($id: String!) {
      Vouching @contract {
        totalVouched(id: $id)
      }
    }
  `,
  packageQuery: gql`
    query packageQuery($uri: String!, $id: String!) {
      ...Metadata
      Vouching @contract {
        totalVouched(id: $id)
        ...ChallengedEvents
      }
    }
    ${vouchingFragments.metadataFragment}
    ${vouchingFragments.challengedEventsFragment}
  `
}
