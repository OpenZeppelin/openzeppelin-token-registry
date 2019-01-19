import React from 'react'
import ContentLoader from 'react-content-loader'

export function GithubProfileImageLoader () {
  return (
    <ContentLoader
      width={109}
      height={109}
      animate
      speed={1}
      primaryColor='#f1f1f1'
      secondaryColor='#f9f9f9'
    >
      <rect id='Rectangle' x='0' y='0' width='109' height='109' rx='0' />
    </ContentLoader>
  )
}
