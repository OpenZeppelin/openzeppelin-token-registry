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
      <Query query={eventsQuery}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error!: ${error}`

          const events = (data.Vouching ? data.Vouching.registeredEvents : []) || []

          return (
            <>
              {
                events.map((event, index) =>
                  <PackageListItem
                    index={index}
                    location={this.props.location}
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
