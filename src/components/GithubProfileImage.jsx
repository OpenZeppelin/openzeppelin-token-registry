/* eslint camelcase: 0 */

import React from 'react'
import { Query } from 'react-apollo'
import { GithubProfileImageLoader } from '~/components/packages/GithubProfileimageLoader'
import { metadataQueries } from '~/queries/metadataQueries'

export function GithubProfileImage (props) {
  const uri = `https://api.github.com/users/${props.user}`

  return (
    <Query query={metadataQueries.webpageImageQuery} variables={{ uri }}>
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
