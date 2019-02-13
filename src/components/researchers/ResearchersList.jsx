import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { ErrorMessage } from '~/components/ErrorMessage'
import { PackageListItemLoader } from '~/components/packages/PackageListItemLoader'
import { ResearchersListItem } from '~/components/researchers/ResearchersListItem'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { researchersVouchedTotals } from '~/projections/researchersVouchedTotals'
import { sortBigNumbers } from '~/utils/sortBigNumbers'

export class ResearchersList extends PureComponent {
  render () {
    return (
      <Query query={vouchingQueries.vouchesQuery}>
        {({ loading, error, data }) => {
          let content

          if (error) {
            return <ErrorMessage errorMessage={error} />
          }

          const packageListLoader =
            <>
              <PackageListItemLoader key='package-item-fragment-0' />
              <PackageListItemLoader key='package-item-fragment-1' />
              <PackageListItemLoader key='package-item-fragment-2' />
            </>

          const events = (data.Vouching ? data.Vouching.allEvents : []) || []

          if (loading) {
            content = packageListLoader
          } else {
            const researchers = researchersVouchedTotals(events)
            const researchersArray = Object.values(researchers)
            const sortedResearchersArray = sortBigNumbers(researchersArray, 'amount')

            content = sortedResearchersArray.reverse().map(
              (researcher, index) =>
                <ResearchersListItem
                  index={index}
                  researcher={researcher}
                  key={`researcher-${index}`}
                />
            )
          }

          return (
            <>
              <h5 className='is-size-5 has-text-grey-dark is-uppercase is-monospaced has-text-centered'>
                Security Researchers
              </h5>
              <br />
              {content}
            </>
          )
        }}
      </Query>
    )
  }
}
