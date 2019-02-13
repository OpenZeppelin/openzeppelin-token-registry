import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ZeppelinLogo from '~/assets/images/zeppelin-logo.svg'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div className='footer--primary'>
            <div className='footer-menu'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://docs.zeppelinos.org/'
                className='footer-item'
              >
                Docs
              </a>

              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/zeppelinos'
                className='footer-item'
              >
                GitHub
              </a>

              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://zeppelinos.org/'
                className='footer-item'
              >
                Site
              </a>
            </div>
          </div>

          <div className='footer--secondary'>
            <div className='footer-brand'>
              <div className='footer-item'>
                  ZeppelinOS Registry was started and is sponsored by
                <br />
                <br />

                <h6 className='is-size-6'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://zeppelin.solutions/'
                  >
                    <ZeppelinLogo />
                  </a>
                </h6>
              </div>
            </div>

            <br />

            <span
              className='footer-item footer-item--copyright'
            >
                &copy; {year} Zeppelin
            </span>
          </div>
        </footer>
      </>
    )
  }
}

export const FooterContainer = withRouter(Footer)
