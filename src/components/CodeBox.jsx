import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import ReactTimeout from 'react-timeout'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { CopyOutline } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const CodeBox = ReactTimeout(class _CodeBox extends PureComponent {
  static defaultProps = {
    action: 'link'
  }

  static propTypes = {
    metadata: PropTypes.object.isRequired,
    action: PropTypes.string
  }

  handleCodeClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleCopyClick = () => {
    ReactTooltip.show(ReactDOM.findDOMNode(this.refs.foo))

    this.props.setTimeout(() => {
      ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.foo))
    }, 3000)
  }

  render () {
    return (
      <code className='code code--example' onClick={this.handleCodeClick}>
        <span className='has-text-grey'>$</span> zos link &lt;package-name&gt;
        <br />
        <br />
        <span className='has-text-grey'># Example:</span>
        <br />
        <span className='has-text-grey'>$</span> <span className='has-text-success'>zos</span> <span className='has-text-info'>link</span> openzeppelin-eth

        <span className='has-text-right is-inline-block is-copy-button'>
          <div ref='foo' data-tip='Copied to Clipboard' />
          <ReactTooltip />

          <CopyToClipboard
            text='zos link openzeppelin-eth'
            onCopy={this.handleCopyClick}>
            <span className='has-text-right'><AntdIcon type={CopyOutline} className='antd-icon' /></span>
          </CopyToClipboard>
        </span>
      </code>
    )
  }
})
