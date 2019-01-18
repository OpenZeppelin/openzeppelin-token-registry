import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { sortBy } from 'lodash'
import { Query } from 'react-apollo'
import { researchersVouchedTotals } from '~/utils/researchersVouchedTotals'
import { ResearchersListItem } from '~/components/researchers/ResearchersListItem'

const vouchesQuery = gql`
  query vouchesQuery {
    Vouching @contract {
      allEvents @pastEvents(filter: { id: $id }, fromBlock: "0", toBlock: "latest")
    }
  }
`

export class ResearchersList extends PureComponent {
  render () {
    return (
      <Query query={vouchesQuery}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error!: ${error}`

          const events = (data.Vouching ? data.Vouching.allEvents : []) || []
          const researchers = researchersVouchedTotals(events)
          const researchersArray = Object.values(researchers)
          const sortedResearchersArray = sortBy(
            researchersArray,
            (researcher) => researcher.amount
          ).reverse()

          return (
            <>
              {
                sortedResearchersArray.map((researcher, index) =>
                  <ResearchersListItem
                    index={index}
                    researcher={researcher}
                    key={`researcher-${index}`}
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
