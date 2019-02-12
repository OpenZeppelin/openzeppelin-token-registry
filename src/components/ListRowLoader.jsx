import React from 'react'
import ContentLoader from 'react-content-loader'

export function ListRowLoader () {
  return (
    <div>
      <ContentLoader
        width={778}
        height={20}
        animate
        speed={1}
        primaryColor='#efefef'
        secondaryColor='#f5f5f5'
      >
        <rect id='Rectangles' x='2' y='0' width='220' height='29' rx='2' />
        <rect id='Rectangles2' x='100' y='0' width='30' height='29' rx='2' />
      </ContentLoader>
    </div>
  )
}
