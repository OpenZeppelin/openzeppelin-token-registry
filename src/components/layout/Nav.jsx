import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import ZeppelinOSLogo from '~/assets/images/zeppelin-os-logo.svg'
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
    const heroColor = ''
    // const heroColor = 'is-dark'

    return (
      <>
        <div
          className={classnames('nav-background no-select', { 'is-active': this.state.mobileNavActive })}
          onClick={this.closeMobileNav} />
        <nav className={`navbar ${heroColor}`}>
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item">
                <Link to={routes.HOME} className="navbar-item">
                  <ZeppelinOSLogo />
                </Link>
              </div>

              <button
                className={classnames(
                  'navbar-burger',
                  'burger',
                  { 'is-active': this.state.mobileNavActive }
                )}
                data-target="navbar-menu"
                onClick={this.handleToggleMobileNav}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <div id="navbar-menu" className={classnames(
              'navbar-menu',
              { 'is-active': this.state.mobileNavActive }
            )}>
              <div className="navbar-end">
                <div className="navbar-item">
                  <a
                    href="https://docs.zeppelinos.org/"
                    className="navbar-item"
                  >
                    Docs
                  </a>
                </div>

                <div className="navbar-item">
                  <a
                    href="https://github.com/zeppelinos"
                    className='navbar-item'
                  >
                    GitHub
                  </a>
                </div>

                <div className="navbar-item">
                  <a
                    href="https://zeppelinos.org/"
                    className='navbar-item'
                  >
                    Site
                  </a>
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
