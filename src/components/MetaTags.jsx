import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export const MetaTags = class _MetaTags extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    location: {}
  }

  render () {
    const location = this.props.location || {}

    const logoPath = '/zeppelin-os-logo.svg'
    const siteTitle = 'ZeppelinOS EVM Package Registry'
    const siteURL = 'https://zeppelin-vouching-app.netlify.com'
    const siteDescription = 'This is the desc'
    const twitterHandle = 'zeppelinorg'
    const ownerCoName = 'Zeppelin Solutions'
    const author = 'Zeppelin Solutions & Delta Camp'
    const keywords = 'zeppelinos zos vouch'
    const themeColor = '#070707'
    const googleFontsURL = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Mono:400,700,900'
    const year = (new Date()).getFullYear()

    return (
      <Helmet
        titleTemplate={`%s | ${siteTitle}`}
        defaultTitle={siteTitle}
        htmlAttributes={{
          'lang': 'en',
          'class': this.props.cssClass
        }}
        link={
          [
            {
              href: googleFontsURL,
              rel: 'stylesheet'
            }
          ]
        }
        meta={[
          {
            name: 'theme-color',
            content: themeColor
          },
          {
            name: 'description',
            content: siteDescription
          },
          {
            name: 'keywords',
            content: keywords
          },
          {
            name: 'author',
            content: author
          },
          {
            name: 'copyright',
            content: `© ${year} ${ownerCoName}`
          },
          {
            property: 'og:title',
            content: siteTitle
          },
          {
            property: 'og:description',
            content: siteDescription
          },
          {
            property: 'og:site_name',
            content: siteTitle
          },
          {
            property: 'og:url',
            content: `${siteURL}${location.pathname}`
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:image',
            content: `${siteURL}${logoPath}`
          },
          {
            property: 'twitter:title',
            content: siteTitle
          },
          {
            property: 'twitter:card',
            content: 'summary'
          },
          {
            property: 'twitter:site',
            content: `@${twitterHandle}`
          },
          {
            property: 'twitter:image',
            content: `${siteURL}${logoPath}`
          },
          {
            property: 'twitter:url',
            content: `https://twitter.com/${twitterHandle}`
          }
        ]}
      />
    )
  }
}
