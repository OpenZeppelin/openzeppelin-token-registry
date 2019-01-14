import React, { PureComponent } from 'react'
import gridImage from '~/assets/images/packages_grid.png'
import { PackageList } from '~/components/packages/PackageList'

export class PackageListPage extends PureComponent {

  render () {
    return (
      <div>
        <section className="hero is-primary is-bold">
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column'>
                  <h2 className='title'>Gain confidence in the security of the EVM packages you use</h2>
                  <p>
                    Vouch reassures you that the Ethereum Virtual Machine packages you choose to leverage are safe.
                    Security reseachers stake ZEP to vouch for the security and reliability of EVM packages.
                  </p>
                </div>
                <div className='column'>
                  <img alt="package grid" src={gridImage} />
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
