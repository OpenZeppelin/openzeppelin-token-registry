import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const FourOhFour = class _FourOhFour extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='404 Page Not Found'
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <button
                  onClick={this.context.router.history.goBack}
                  className='button is-monospaced is-text has-text-weight-bold back-button has-underline-border'
                >
                  {'<'} Back
                </button>

                <br />
                <br />

                <h2 className='is-size-2'>
                  Couldn't find that ...
                </h2>
                <br />
                <h4 className='is-size-4'>
                  Nothing lives at {this.props.location.pathname}
                </h4>

                <br />

                <Link
                  to={routes.HOME}
                  className='button is-pill is-purple'
                >
                  {'<'} Take me home
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}
