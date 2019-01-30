import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ZeppelinLogo from '~/assets/images/zeppelin-logo.svg'

export const Footer = class _Footer extends Component {
  render () {
    const year = new Date().getFullYear()
    return (
      <>
        <footer className='footer has-text-centered'>
          <div class='container'>
            <div class='columns'>
              <div className='column is-12-mobile is-6-tablet is-offset-3-tablet is-6-desktop is-offset-3-desktop is-4-widescreen is-offset-4-widescreen'>
                <div className='footer-brand'>
                  <div className='footer-item'>
                    ZeppelinOS was started and is sponsored by
                    <br />
                    <br />

                    <h6 className='is-size-6'>
                      <a href="https://zeppelin.solutions/">
                        <ZeppelinLogo />
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='container-fluid footer--secondary'>
            <div class='columns'>
              <div className='column is-8-mobile is-offset-2-mobile is-6-tablet is-offset-3-tablet is-6-desktop is-offset-3-desktop is-4-widescreen is-offset-4-widescreen'>
                <div className='footer-menu'>
                  <a
                    href='https://docs.zeppelinos.org/'
                    className='footer-item'
                  >
                    Docs
                  </a>

                  <a
                    href='https://github.com/zeppelinos'
                    className='footer-item'
                  >
                    GitHub
                  </a>

                  <a
                    href='https://zeppelinos.org/'
                    className='footer-item'
                  >
                    Site
                  </a>
                  
                  <span
                    className='footer-item footer-item--copyright'
                  >
                    &copy; {year} Zeppelin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}

export const FooterContainer = withRouter(Footer)
