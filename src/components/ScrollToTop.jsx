import { PureComponent } from 'react'

export const ScrollToTop = class _ScrollToTop extends PureComponent {
  componentDidMount() {
    if (window) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return null
  }
}
