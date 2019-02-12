import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'
import * as routes from '~/../config/routes'

export const AppErrorPage = class _AppErrorPage extends PureComponent {
  render () {
    return (
      <div className='is-positioned-absolutely is-full-width'>
        <Helmet
          title='Page Error'
        />

        <ScrollToTop />

        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column main-content--column is-10-tablet is-8-widescreen is-offset-2-widescreen is-8-fullhd is-offset-2-fullhd'>
                <p className='content'>
                  <Link
                    to={routes.HOME}
                    className='button is-monospaced is-text has-text-weight-bold package-page--back-button'
                  >
                    {'<'} Back to Home
                  </Link>
                </p>

                <h1 className='is-size-1'>
                  There's been an error!
                </h1>
                <br />
                <h4 className='is-size-4'>
                  {"We're sorry.  You'll have to go back."}
                </h4>

                <br />
                <br />

                <Link
                  to={routes.HOME}
                  className='button is-pill is-purple'
                >
                  {'<'} Take me back
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
