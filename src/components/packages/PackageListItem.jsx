import React, {
  PureComponent
} from 'react'
import OpenZeppelinEthLogoImage from '~/assets/images/open-zeppelin-eth_logo.png'
import AntdIcon from '@ant-design/icons-react'
import {
  GithubFill
} from '@ant-design/icons'

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
              <h2 className='subTitle'>
                <small>repository</small>
              </h2>
              <p>
                <a href='https://github.com/DeltaCamp/zeppelin-vouching-app'>
                  <AntdIcon type={GithubFill} className="antd-icon" />&nbsp;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
