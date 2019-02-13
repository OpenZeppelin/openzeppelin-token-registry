import { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import ReactTimeout from 'react-timeout'

export const ScrollToTop = ReactTimeout(class _ScrollToTop extends PureComponent {
  static propTypes = {
    delay: PropTypes.number
  }

  static defaultProps = {
    delay: 200
  }

  componentDidMount () {
    this.props.setTimeout(() => {
      if (window) {
        window.scrollTo(0, 0)
      }
    }, this.props.delay)
  }

  render () {
    return null
  }
})
