import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { MetaTags } from '~/components/MetaTags'
import { PackageListPage } from '~/components/pages/PackageListPage'
import { NavContainer } from '~/components/layout/Nav'
import { OtherPageContainer } from '~/components/pages/OtherPage'
import { PackageItemPage } from '~/components/pages/PackageItemPage'
import { FourOhFour } from '~/components/pages/FourOhFour'
import { getPurePathname } from '~/utils/getPurePathname'
import { mixpanel } from '~/mixpanel'
import * as routes from '~/../config/routes'
import { withSentryBoundary } from '~/components/withSentryBoundary'
import { withTracker } from '~/components/withTracker'

const App = class _App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    location: {}
  }

  currentPage = () => {
    const pathname = this.props.location.pathname
    return getPurePathname(pathname)
  }

  componentWillMount () {
    mixpanel().track('render', {
      path: this.currentPage()
    })
  }

  render () {
    return (
      <>
        <MetaTags {...this.props} cssClass={this.currentPage()} />
        <NavContainer />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 700, exit: 200 }}
            classNames='layout'
            appear
          >
            <Switch location={this.props.location}>

              <Route path={routes.PACKAGE_ITEM} component={withSentryBoundary(withTracker(PackageItemPage))} />
              <Route path={routes.OTHER_PAGE} component={withSentryBoundary(withTracker(OtherPageContainer))} />
              <Route exact path={routes.HOME} component={withSentryBoundary(withTracker(PackageListPage))} />
              <Route exact path={routes.HOME_RESEARCHERS_LIST} component={withSentryBoundary(withTracker(PackageListPage))} />

              <Route component={withTracker(FourOhFour)} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </>
    )
  }
}

export const AppContainer = withRouter(hot(module)(App))
