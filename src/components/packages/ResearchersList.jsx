import React, { PureComponent } from 'react'
import { ResearchersListItem } from './ResearchersListItem'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      registeredEvents: Registered @pastEvents(fromBlock: "0", toBlock: "latest")
    }
  }
`

export class ResearchersList extends PureComponent {
  render () {
    return (
      <Query query={eventsQuery}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error!: ${error}`

          const events = (data.Vouching ? data.Vouching.registeredEvents : []) || []
          const researchers = {}

          events.forEach((event, index) => {
            if (researchers[event.returnValues.owner]) {
              researchers[event.returnValues.owner].amount += researchers[event.returnValues.amount]
            }
            researchers[event.returnValues.owner] = {
              address: event.returnValues.owner,
              amount: event.returnValues.amount
            }
          })
          const researchersArray = Object.values(researchers)

          return (
            <>
              {
                researchersArray.map((researcher, index) =>
                  <ResearchersListItem
                    index={index}
                    researcher={researcher}
                    key={`researcher-${researcher.index}`}
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
