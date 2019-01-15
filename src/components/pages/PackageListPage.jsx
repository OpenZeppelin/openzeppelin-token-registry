import React, { PureComponent } from 'react'
import { PackageList } from '~/components/packages/PackageList'

export class PackageListPage extends PureComponent {

  render () {
    return (
      <div>
        <section className="hero is-black is-bold">
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-full-desktop is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd'>
                  <div className='has-text-centered'>
                    <h2 className='title'>Gain confidence in the security of the EVM packages you use</h2>
                    <p>
                      Interested in developing your own EVM package?
                      <br />
                      Want to vouch for your favourite libraries?
                    </p>
                    <p>
                      <button className='button is-primary is-uppercase'>Sign me up!</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='section has-background-light'>
          <div className='container'>
            <div className='columns'>
              <div className='column has-text-right'>
                <b>Not using Zeppelin OS yet?</b>
              </div>
              <div className='column has-text-left'>
                <div className='button is-primary'>Get Started with ZOS</div>
              </div>
            </div>
          </div>
        </section>

        <section className='section'>
          <PackageList />
        </section>
      </div>
    )
  }
}
