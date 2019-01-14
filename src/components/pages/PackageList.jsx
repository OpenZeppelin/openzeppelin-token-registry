import React, { PureComponent } from 'react'

export class PackageList extends PureComponent {

  render () {
    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
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
                <img alt="package grid" src='/images/packages_grid.png' />
              </div>
            </div>
          </div>
        </section>

        <div className=''>
        </div>
      </div>
    )
  }
}
