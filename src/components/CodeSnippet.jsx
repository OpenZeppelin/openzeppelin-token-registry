import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import PropTypes from 'prop-types'
import AntdIcon from '@ant-design/icons-react'
import { CopyOutline } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { stringToSlug } from '~/utils/stringToSlug'

export const CodeSnippet = ReactTimeout(class _CodeSnippet extends PureComponent {
  state = {}

  static propTypes = {
    metadata: PropTypes.object.isRequired
  }

  handleCodeClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleCopyClick = () => {
    this.setState({ copied: true })

    this.props.setTimeout(() => {
      this.setState({ copied: false })
    }, 3000)
  }

  render () {
    const slug = stringToSlug(this.props.metadata.name)
    const zosInstallSnippet = `zos link ${slug}`

    return (
      <code className='code--quick-install' onClick={this.handleCodeClick}>
        $ {zosInstallSnippet}

        <span className='has-text-right is-inline-block is-copy-button'>
          {this.state.copied ? 'Copied!' : ''}

          <CopyToClipboard text={zosInstallSnippet}
            onCopy={this.handleCopyClick}>
            <span className='has-text-right'><AntdIcon type={CopyOutline} className='antd-icon' /></span>
          </CopyToClipboard>
        </span>
      </code>
    )
  }
})
