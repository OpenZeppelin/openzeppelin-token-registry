import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '~/../config/routes'

export const HeroBetaCallout = () => {
  return (
    <div className='hero is-light is-medium has-text-centered'>
      <div className='hero-body'>
        <p className='is-size-5 is-monospaced is-uppercase has-text-grey-dark'>
          Help us build the Zeppelin Registry
        </p>
        <Link
          className='button is-pill is-size-5'
          to={routes.BETA_SIGNUP}
        >
          Join the Beta
        </Link>
      </div>
    </div>
  )
}
