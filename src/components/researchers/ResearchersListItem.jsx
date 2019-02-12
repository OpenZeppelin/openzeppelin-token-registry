import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { formatRoute } from 'react-router-named-routes'
import { Redirect, Link } from 'react-router-dom'
import { EnsName } from '~/components/EnsName'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import ZepTokenLogo from '~/assets/images/zep-token-logo--fixed.svg'
import * as routes from '~/../config/routes'

export const ResearchersListItem = ReactTimeout(class _ResearchersListItem extends PureComponent {
  state = {}

  static propTypes = {
    researcher: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.setTimeout(() => {
      this.setState({ startAnimating: true })
    }, 20)
  }

  render () {
    const address = this.props.researcher.address
    const link = formatRoute(routes.RESEARCHER, { address })

    if (this.state.toResearcher) {
      return <Redirect to={link} />
    }

    const animatingCssClassNames = classnames(
      'fade-in',
      'slide-up',
      'medium',
      {
        'slide-up-enter': this.state.startAnimating,
        'fade-in-enter': this.state.startAnimating
      }
    )

    return (
      <div className='list-item list-item__researcher'>
        <span
          className={`${animatingCssClassNames}
          list-item__cell
          list-item__cell--id
          has-text-grey
          has-text-weight-light
        `}>
          <Link
            to={link}
            className='no-select title is-size-4 has-text-weight-normal'
          >
            #{this.props.index + 1} &nbsp;
          </Link>
        </span>

        <span className={`
          ${animatingCssClassNames}
          list-item__cell
          list-item__cell--total-vouched
        `}>
          <Link
            to={link}
            className='no-select'
          >
            <h6 className='list-item__cell--total-vouched__title is-size-6 has-text-weight-bold is-monospaced has-text-grey'>
              TOTAL VOUCHED
            </h6>
            <h3 className='list-item__cell--total-vouched__value is-size-3 is-monospaced'>
              <span className='item--version has-text-black has-text-weight-light'>
                <ZepTokenLogo width='22' height='22' className='researcher--zep-token-icon' />{displayWeiToEther(this.props.researcher.amount)}
              </span>
            </h3>
          </Link>
        </span>

        <span className={`
          ${animatingCssClassNames}
          list-item__cell
          list-item__cell--title
          list-item__cell--researcher-address
        `}>
          <Link
            to={link}
            className='no-select'
          >
            <h5 className='title is-size-5 is-monospaced has-text-link'>
              <EnsName address={this.props.researcher.address} />
            </h5>
          </Link>
        </span>

        <span className={`
          ${animatingCssClassNames}
          list-item__cell
          list-item__cell--view-more
          has-text-right
        `}>
          <Link
            to={link}
            className='no-select list-item--view-grid'
          >
            <span className='has-text-info is-size-6 is-monospaced list-item--view-more-link list-item--view-more-link__researcher'>
              View More &gt;
            </span>
          </Link>
        </span>

      </div>
    )
  }
})
