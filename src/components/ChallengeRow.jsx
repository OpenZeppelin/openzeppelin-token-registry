import React, { PureComponent } from 'react'
import { GitHubLink } from '~/components/GitHubLink'
import PropTypes from 'prop-types'

const STATUS_COLORS = {
  'Open': 'success',
  'Closed': 'grey'
}

const PRIORITY_COLORS = {
  'Low': 'info',
  'Medium': 'warning',
  'High': 'danger'
}

export const ChallengeRow = class _ChallengeRow extends PureComponent {
  static propTypes = {
    challenge: PropTypes.object.isRequired
  }

  render () {
    const { name, status, priority, bounty, url } = this.props.challenge

    const statusColor   = STATUS_COLORS[status]
    const priorityColor = PRIORITY_COLORS[priority]

    return (
      <tr>
        <td>
          {name}
        </td>
        <td className={`has-text-${statusColor}`}>
          {status}
        </td>
        <td className={`has-text-${priorityColor}`}>
          {priority}
        </td>
        <td>
          {bounty} Z
        </td>
        <td className="has-text-right">
          <GitHubLink
            url={url}
            cssClassNames='icon-small'
          />
        </td>
      </tr>
    )
  }
}
