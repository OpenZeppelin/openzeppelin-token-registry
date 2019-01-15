import React, { PureComponent } from 'react'
import { PackageListItem } from './PackageListItem'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      registeredEvents: Registered @pastEvents(fromBlock: "0", toBlock: "latest")
    }
  }
`

export class PackageList extends PureComponent {
  render () {
    return (
      <Query
        query={eventsQuery}>
        {({ data }) => {
          const events = (data.Vouching ? data.Vouching.registeredEvents : []) || []

          return (
            <>
              {
                events.map(
                  event =>
                    <PackageListItem
                      package={event.returnValues}
                      key={event.returnValues.id}
                    />
                )
              }
            </>
          )
        }}
      </Query>
    )
  }
}

// `${p.name}-${p.version}`
