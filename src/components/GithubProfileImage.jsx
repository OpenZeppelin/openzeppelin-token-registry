/* eslint camelcase: 0 */

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { GithubProfileImageLoader } from '~/components/packages/GithubProfileimageLoader'

const webpageImageQuery = gql`
  query webpageImageQuery($uri: String!) {
    metadata(uri: $uri) @client {
      id
      avatar_url
    }
  }
`

export function GithubProfileImage (props) {
  const uri = `https://api.github.com/users/${props.user}`

  return (
    <Query query={webpageImageQuery} variables={{ uri }}>
      {({ data }) => {
        let content

        const { metadata } = data || {}
        const { avatar_url } = metadata || {}

        if (avatar_url) {
          content = <img alt='github avatar img' src={avatar_url} {...props} />
        } else {
          content = <GithubProfileImageLoader />
        }

        return content
      }}
    </Query>
  )
}
