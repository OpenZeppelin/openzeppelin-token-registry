import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { Home } from '~/components/Pages/Home'
import { OtherPage } from '~/components/Pages/OtherPage'
import { FourOhFour } from '~/components/Pages/FourOhFour'

import * as routes from '~/../config/routes'

const App = class _App extends PureComponent {
  render () {
    return (
      <>
        <section className='section'>
          <div className='container is-fluid'>
            <div className='columns'>
              <div className='column is-12-tablet is-10-widescreen is-offset-1-widescreen'>
                <TransitionGroup>
                  <CSSTransition
                    key={this.props.location.key}
                    timeout={{ enter: 700, exit: 200 }}
                    classNames='page'
                    appear={true}
                  >
                    <Switch location={this.props.location}>
                      <Route path={routes.OTHER_PAGE} component={OtherPage} />
                      <Route path={routes.HOME} component={Home} />

                      <Route component={FourOhFour} />
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
