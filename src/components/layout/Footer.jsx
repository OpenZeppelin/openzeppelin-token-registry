import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ZeppelinLogo from '~/assets/images/zeppelin-logo.svg'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div className='container-fluid footer--primary'>
            <div className='columns'>
              <div className='column is-12-mobile is-6-tablet is-offset-3-tablet is-6-desktop is-offset-3-desktop is-4-widescreen is-offset-4-widescreen'>

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
            </div>
          </div>

          <div className='container-fluid footer--secondary'>
            <div className='columns'>
              <div className='column is-12-mobile is-6-tablet is-offset-3-tablet is-6-desktop is-offset-3-desktop is-4-widescreen is-offset-4-widescreen'>

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
            </div>
          </div>
        </footer>
      </>
    )
  }
}

export const FooterContainer = withRouter(Footer)
