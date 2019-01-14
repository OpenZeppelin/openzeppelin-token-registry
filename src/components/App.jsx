import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { NavContainer } from '~/components/layout/Nav'

import { HomeContainer } from '~/components/pages/Home'
import { OtherPageContainer } from '~/components/pages/OtherPage'
import { FourOhFourContainer } from '~/components/pages/FourOhFour'

import * as routes from '~/../config/routes'

const App = class _App extends PureComponent {
  render () {
    return (
      <>
        <section className="section">
          <NavContainer />

          <div className="container is-fluid">
            <div className="columns">
              <div className="column is-12-tablet is-10-widescreen is-offset-1-widescreen">
                <TransitionGroup>
                  <CSSTransition
                    key={this.props.location.key}
                    timeout={{ enter: 700, exit: 200 }}
                    classNames="layout"
                    appear={true}
                  >
                    <Switch location={this.props.location}>
                      <Route path={routes.OTHER_PAGE} component={OtherPageContainer} />
                      <Route path={routes.HOME} component={HomeContainer} />

                      <Route component={FourOhFourContainer} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export const AppContainer = withRouter(hot(module)(App))
