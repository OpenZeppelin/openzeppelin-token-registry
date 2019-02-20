import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { ListRowLoader } from '~/components/ListRowLoader'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import { normalizeAddr } from '~/utils/normalizeAddr'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'
import * as routes from '~/../config/routes'

export class PackageItemListRow extends PureComponent {
  static propTypes = {
    packageItem: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired
  }

  render () {
    const { packageItem } = this.props
    const address = normalizeAddr(this.props.address)

    return (
      <Query query={vouchingQueries.eventsQuery}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) {
            console.warn(error)
            return null
          }

          const events = data.Vouching ? data.Vouching.Registered : []
          const id = packageItem.id
          const event = events.find((event) => event.parsedLog.values.id.eq(id))

          if (!event) {
            console.warn('event not found')
            return null
          }

          const result = event.parsedLog.values

          return (
            <Query
              query={vouchingQueries.packageQuery}
              variables={{ uri: result.metadataURI, id: result.id.toString() }}
            >
              {
                ({ loading, error, data }) => {
                  if (error) {
                    console.warn(error)
                    return null
                  }

                  if (loading) {
                    return <li><ListRowLoader /></li>
                  } else {
                    const { metadata } = data
                    const { name, version } = metadata

                    return (
                      <li key={`packageItem-${name}-${version}`} className={classnames(
                        'list--row',
                        'list--row__two-column',
                        'truncate'
                      )}>
                        <span className='list--cell list__has-padding is-borderless is-monospaced break-words'>
                          <Link
                            to={formatRoute(routes.PACKAGE_ITEM, { id, version })}
                            className='no-margin-right has-text-link is-uppercase has-hover-border'
                          >
                            {name} v{version}
                          </Link>
                        </span>

                        <span className='list--cell list__has-padding is-borderless'>
                          <ZepTokenLogo width='12' height='12' />&nbsp;{displayWeiToEther(packageItem.vouchTotals[address])}
                        </span>
                      </li>
                    )
                  }
                }
              }
            </Query>
          )
        }}
      </Query>
    )
  }
}
