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

  render() {
    const location = this.props.location || {}

    const logoPath = '/zeppelin-os-logo.svg'
    const siteTitle = 'ZeppelinOS Vouch'
    const siteUrl = 'https://zeppelin-vouching-app.netlify.com'
    const siteDescription = 'This is the desc'

    const year = (new Date()).getFullYear()

    /*titleTemplate={`%s | ${siteTitle}`}
    defaultTitle={siteTitle}
    htmlAttributes={{
      lang: 'en',
      class: this.props.cssClass
    }}*/

    return (
      <Helmet

        link={
          [
            {
              href: "https://fonts.googleapis.com/css?family=PT+Mono&subset=cyrillic,cyrillic-ext,latin-ext",
              rel: "stylesheet"
            },
            {
              rel: "stylesheet",
              href: "https://use.typekit.net/xce0plw.css"
            },
            {
              rel: 'alternate',
              type: 'application/atom+xml',
              href: `${siteUrl}/rss.xml`,
              title: `The Delta Camp blog feed`
            }
          ]
        }
        meta={[
          {
            name: "google-site-verification",
            content: "AgulHzqJ6_2xljkDwUNxoCen8X7-qzKbGx_DJBGJjgg"
          },
          {
            name: 'theme-color',
            content: '#50286d'
          },
          {
            name: "description",
            content: siteDescription
          },
          {
            name: "keywords",
            content: "zeppelinos zos vouch"
          },
          {
            name: "author",
            content: "Zeppelin & Delta Camp"
          },
          {
            name: "copyright",
            content: `© ${year} Zeppelin Solutions`
          },
          {
            property: "og:title",
            content: siteTitle
          },
          {
            property: "og:description",
            content: siteDescription
          },
          {
            property: "og:site_name",
            content: "deltacamp"
          },
          {
            property: "og:url",
            content: `${siteUrl}${location.pathname}`
          },
          {
            property: "og:type",
            content: "website"
          },
          {
            property: "og:image",
            content: `${siteUrl}${logoPath}`
          },
          {
            property: "twitter:title",
            content: siteTitle
          },
          {
            property: "twitter:card",
            content: "summary"
          },
          {
            property: "twitter:site",
            content: "@teamdeltacamp"
          },
          {
            property: "twitter:image",
            content: `${siteUrl}${logoPath}`
          },
          {
            property: "twitter:url",
            content: 'https://twitter.com/teamdeltacamp'
          }
        ]}
      />
    )
  }
}
