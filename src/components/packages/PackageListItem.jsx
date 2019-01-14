import React, {
  PureComponent
} from 'react'
import OpenZeppelinEthLogoImage from '~/assets/images/open-zeppelin-eth_logo.png'

export class PackageListItem extends PureComponent {
  render () {
    return (
      <div className='package-list-item panel'>
        <div className='panel-block'>
          <div className='columns'>
            <div className='column is-three-quarters'>
              <h1 className='title'>
                <img src={OpenZeppelinEthLogoImage} />
                {this.props.package.name}
                <small>
                  {this.props.package.version}
                </small>
              </h1>
            </div>
            <div className='column'>
              <h2>

              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
