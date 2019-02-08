import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { ResearchersListItem } from '~/components/researchers/ResearchersListItem'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { researchersVouchedTotals } from '~/projections/researchersVouchedTotals'
import { sortBigNumbers } from '~/utils/sortBigNumbers'

export class ResearchersList extends PureComponent {
  render () {
    return (
      <Query query={vouchingQueries.vouchesQuery}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) {
            console.error(error)
            return `${error}`
          }

          const events = (data.Vouching ? data.Vouching.allEvents : []) || []
          const researchers = researchersVouchedTotals(events)
          const researchersArray = Object.values(researchers)
          const sortedResearchersArray = sortBigNumbers(researchersArray, 'amount')

          return (
            <>
              {
                sortedResearchersArray.reverse().map((researcher, index) =>
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
