import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import ReactTimeout from 'react-timeout'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { CopyOutline } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const CodeSnippet = ReactTimeout(class _CodeSnippet extends PureComponent {
  static propTypes = {
    snippet: PropTypes.string.isRequired
  }

  handleCodeClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleCopyClick = () => {
    ReactTooltip.show(ReactDOM.findDOMNode(this.refs.copyTooltip))

    this.props.setTimeout(() => {
      ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.copyTooltip))
    }, 3000)
  }

  render () {
    const { snippet } = this.props

    return (
      <code className='code code--quick-install' onClick={this.handleCodeClick}>
        <span className='has-text-grey-light'>$</span> {snippet}

        <span className='has-text-right is-inline-block is-copy-button'>
          <div ref='copyTooltip' data-tip='Copied!' />

          <ReactTooltip type='info' effect='solid' />

          <CopyToClipboard
            text={snippet}
            onCopy={this.handleCopyClick}
            data-tip='Copy to Clipboard'
          >
            <span className='has-text-right'><AntdIcon type={CopyOutline} className='antd-icon' /></span>
          </CopyToClipboard>
        </span>
      </code>
    )
  }
})
