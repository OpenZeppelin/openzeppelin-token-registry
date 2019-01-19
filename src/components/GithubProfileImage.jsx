/* eslint camelcase: 0 */

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Identicon from 'identicon.js'
import { sha3 } from '~/utils/sha3'

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
        let src

        const { metadata } = data || {}
        const { avatar_url } = metadata || {}

        const hash = sha3(uri)

        if (avatar_url) {
          src = avatar_url
        } else {
          src = `data:image/png;base64,${new Identicon(hash, 420).toString()}`
        }

        const newProps = {
          ...props,
          src
        }

        return <img alt='github avatar img' {...newProps} />
      }}
    </Query>
  )
}
