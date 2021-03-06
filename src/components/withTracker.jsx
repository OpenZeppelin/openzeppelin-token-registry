import React, { Component } from 'react'
import GoogleAnalytics from 'react-ga'

if (process.env.REACT_APP_GA_TRACKING_ID) {
  GoogleAnalytics.initialize(process.env.REACT_APP_GA_TRACKING_ID)
}

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    if (process.env.REACT_APP_GA_TRACKING_ID) {
      GoogleAnalytics.set({
        page,
        ...options
      })
      GoogleAnalytics.pageview(page)
    }
  }

  const HOC = class extends Component {
    componentDidMount () {
      const page = this.props.location.pathname + this.props.location.search
      trackPage(page)
    }

    componentDidUpdate (prevProps) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search
      const nextPage =
        this.props.location.pathname + this.props.location.search

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}
