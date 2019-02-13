import React from 'react'

export const HeroBetaCallout = () => {
  return (
    <div className='hero is-light is-medium has-text-centered'>
      <div className='hero-body'>
        <p className='is-size-5 is-monospaced is-uppercase has-text-grey-dark'>
          Help us build the Zeppelin Registry
        </p>
        <a
          className='button is-pill is-size-5'
          href='http://zpl.in/betaregistration'
          target='_blank'
          rel='noopener noreferrer'>
          Join the Beta
        </a>
      </div>
    </div>
  )
}
