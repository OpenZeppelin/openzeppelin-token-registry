import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import ReactTimeout from 'react-timeout'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { CopyOutline } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { stringToSlug } from '~/utils/stringToSlug'

export const CodeSnippet = ReactTimeout(class _CodeSnippet extends PureComponent {
  static defaultProps = {
    action: 'link'
  }

  static propTypes = {
    metadata: PropTypes.object.isRequired,
    action: PropTypes.string,
    id: PropTypes.string
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
    const slug = stringToSlug(this.props.metadata.name)
    const zosInstallSnippet = `zos ${this.props.action} ${slug} ${this.props.id || ''}`

    return (
      <code className='code code--quick-install' onClick={this.handleCodeClick}>
        <span className='has-text-grey-light'>$</span> {zosInstallSnippet}

        <span className='has-text-right is-inline-block is-copy-button'>
          <div ref='foo' data-tip='Copied to Clipboard' />

          <ReactTooltip />

          <CopyToClipboard
            text={zosInstallSnippet}
            onCopy={this.handleCopyClick}
          >
            <span className='has-text-right'><AntdIcon type={CopyOutline} className='antd-icon' /></span>
          </CopyToClipboard>
        </span>
      </code>
    )
  }
})
