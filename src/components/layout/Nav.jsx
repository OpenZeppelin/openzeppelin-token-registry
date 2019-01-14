import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import * as routes from '~/../config/routes'

export const Nav = class _Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mobileNavActive: false
    }
  }

  toggleMobileNav = (e) => {
    const mobileNavActive = !this.state.mobileNavActive

    this.setState({ mobileNavActive })
  }

  closeMobileNav = (e) => {
    this.setState({ mobileNavActive: false })
  }

  render () {
    return (
      <>
        <nav className="navbar is-fixed-top is-dark">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item">
                <Link to={routes.HOME} className="navbar-item">
                  Brand
                </Link>
              </div>

              <button
                className={classnames(
                  'navbar-burger',
                  'burger',
                  { 'is-active': this.state.mobileNavActive }
                )}
                data-target="navbar-menu"
                onClick={this.toggleMobileMenu}
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
                  <NavLink
                    exact
                    activeClassName="is-active"
                    to={routes.HOME}
                    className="navbar-item"
                    onClick={this.closeMobileNav}
                  >
                    Home
                  </NavLink>
                </div>

                <div className="navbar-item">
                  <NavLink
                    activeClassName="is-active"
                    to={routes.OTHER_PAGE}
                    className='navbar-item'
                    onClick={this.closeMobileNav}
                  >
                    Page 2
                  </NavLink>
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
