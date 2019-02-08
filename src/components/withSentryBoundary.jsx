import React, { Component } from 'react'
import { AppErrorPage } from '~/components/pages/AppErrorPage'
import * as Sentry from '@sentry/browser'

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN
  })
}

// should have been called before using it here
// ideally before even rendering your react app

export function withSentryBoundary (WrappedComponent) {
  return class SentryBoundary extends Component {
    constructor (props) {
      super(props)
      this.state = { error: null }
    }

    componentDidCatch (error, errorInfo) {
      this.setState({ error })
      if (process.env.REACT_APP_SENTRY_DSN) {
        Sentry.withScope(scope => {
          Object.keys(errorInfo).forEach(key => {
            scope.setExtra(key, errorInfo[key])
          })
          Sentry.captureException(error)
        })
      }
    }

    render () {
      if (this.state.error) {
        // render fallback UI
        return <AppErrorPage />
      } else {
        // when there's not an error, render children untouched
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
