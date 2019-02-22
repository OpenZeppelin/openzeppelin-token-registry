import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import EVMRegistryLogo from '~/assets/images/evm-registry--logo.svg'
import ZeppelinOSLogo from '~/assets/images/zeppelin-os--logo.svg'
import * as routes from '~/../config/routes'

export const Nav = class _Nav extends Component {
  state = {
    mobileNavActive: false
  }

  handleToggleMobileNav = (e) => {
    const mobileNavActive = !this.state.mobileNavActive

    this.setState({ mobileNavActive })
  }

  closeMobileNav = (e) => {
    this.setState({ mobileNavActive: false })
  }

  render () {
    const navColor = 'is-dark'

    return (
      <>
        <div
          className={classnames('nav-background no-select', { 'is-active': this.state.mobileNavActive })}
          onClick={this.closeMobileNav}
        />

        <nav className={`navbar ${navColor}`}>
          <div className='container'>
            <div className='row navbar-menu-container'>
              <div className='navbar-brand col-xs-8 col-md-8'>
                <Link to={routes.HOME} className='navbar-item'>
                  <EVMRegistryLogo />
                </Link>

                <a href='https://zeppelinos.org/' className='navbar-item'>
                  <ZeppelinOSLogo className='navbar-brand__tertiary-logo' />
                </a>
              </div>

              <div className='col-xs-4 is-hidden-tablet has-text-right'>
                <button
                  className={classnames(
                    'burger',
                    'burger-slip',
                    { 'open': this.state.mobileNavActive }
                  )}
                  data-target='navbar-menu'
                  onClick={this.handleToggleMobileNav}
                >
                  <div className='burger-lines' />
                </button>
              </div>

              <div id='navbar-menu' className={classnames(
                'navbar-menu',
                'col-xs-4',
                'col-md-4',
                { 'is-active': this.state.mobileNavActive }
              )}>
                <div className='navbar-end'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://docs.zeppelinos.org/'
                    className='navbar-item'
                  >
                      Docs
                  </a>

                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://github.com/zeppelinos'
                    className='navbar-item'
                  >
                      GitHub
                  </a>

                  <Link
                    className='navbar-item'
                    to={routes.BETA_SIGNUP}
                  >
                    Beta
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </nav>
      </>
    )
  }
}

export const NavContainer = withRouter(Nav)
