import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { GithubFill } from '@ant-design/icons'

export const GitHubLink = class _GitHubLink extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    cssClassNames: PropTypes.string
  }

  static defaultProps = {
    cssClassNames: 'package-item--github-icon'
  }

  handleGitHubLinkClick = (url) => {
    if (window) {
      window.location.href = url
    }
  }

  render () {
    return (
      <button
        className={classnames(
          'is-text',
          'button',
          this.props.cssClassNames
        )}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()

          this.handleGitHubLinkClick(this.props.url)
        }}
      >
        <AntdIcon type={GithubFill} className='antd-icon' />
      </button>
    )
  }
}
