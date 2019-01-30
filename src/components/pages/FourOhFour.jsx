import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const FourOhFour = class _FourOhFour extends PureComponent {
  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
        <Helmet
          title='404 Page Not Found'
        />

        <ScrollToTop />

        <div className='container'>
          <div className='columns'>
            <div className='column main-content--column is-10-tablet is-10-desktop is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
              <Link
                to={routes.HOME}
                className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
              >
                {'<'} Back to Home
              </Link>

              <h1 className='is-size-1'>
                We couldn't find that!
              </h1>
              <br />
              <h4 className='is-size-4'>
                There is no content at this URL:
              </h4>
              <h6 className='is-size-6'>
                "{this.props.location.pathname}"
              </h6>

              <br />
              <hr />
              <br />

              <Link
                to={routes.HOME}
                className='button is-pill is-purple'
              >
                {'<'} Take me back to the packages
              </Link>
            </div>
          </div>
        </div>

        <FooterContainer />
      </div>
    )
  }
}
