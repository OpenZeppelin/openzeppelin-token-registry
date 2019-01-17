import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
        const { metadata } = data || {}
        const { avatar_url } = metadata || {}

        const newProps = {
          ...props,
          src: avatar_url
        }

        return <img {...newProps} />
      }}
    </Query>
  )
}
