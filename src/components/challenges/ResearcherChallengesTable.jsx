import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { ChallengeHeaderRow } from '~/components/challenges/ChallengeHeaderRow'
import { ChallengeRow } from '~/components/challenges/ChallengeRow'
import { ErrorMessage } from '~/components/ErrorMessage'
import { ListRowLoader } from '~/components/ListRowLoader'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { normalizeAddr } from '~/utils/normalizeAddr'

export class ResearcherChallengesTable extends PureComponent {
  static propTypes = {
    address: PropTypes.string
  }

  static defaultProps = {
    address: ''
  }

  render () {
    const address = normalizeAddr(this.props.address)

    return (
      <Query query={vouchingQueries.researcherChallengesQuery} variables={{ address: address.toString() }}>
        {({ loading, error, data }) => {
          let content

          if (error) return <ErrorMessage errorMessage={error} />

          const challengeEvents = (data.Vouching ? data.Vouching.Challenged : []) || []
          const noChallenges = challengeEvents.length === 0

          if (loading) {
            content = <li className='list--row list--row_challenge'><ListRowLoader /></li>
          } else {
            content = (
              <>
                {noChallenges ? (
                  <li className='list--row list--row__blank-state'>
                    <span className='list--cell list--cell__blank-state'>
                      This reseacher has yet to challenge a package.
                    </span>
                  </li>
                ) : (
                  challengeEvents.map(challenged =>
                    <ChallengeRow
                      challenged={challenged}
                      key={challenged.parsedLog.values.challengeID.toString()}
                    />
                  )
                )}
              </>
            )
          }

          return (
            <div className='row'>
              <div className='col-xs-12'>
                <h5 className='is-size-5 has-text-weight-semibold'>
                  Challenges
                </h5>
                <br />

                <ul className='list'>
                  <ChallengeHeaderRow />

                  {content}
                </ul>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
