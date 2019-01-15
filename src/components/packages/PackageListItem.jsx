import React, {
  PureComponent
} from 'react'
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
              <h4 className='title is-size-4'>
                {this.props.package.name}

                <span className="package-list-item--version has-text-grey has-text-weight-light">
                  v{this.props.package.version}
                </span>
              </h4>
              <code className="code--quick-install">
                $ zos link openzeppelin-eth
              </code>
              <a
                className="package-list-item--github-icon"
                href="https://github.com/DeltaCamp/zeppelin-vouching-app"
              >
                <AntdIcon type={GithubFill} className="antd-icon" />
              </a>
            </div>

            <div className='column'>
              <h6 className='subtitle is-size-6'>
                VOUCHED
              </h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
