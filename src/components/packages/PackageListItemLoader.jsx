import React from 'react'
import ContentLoader from 'react-content-loader'

export function PackageListItemLoader () {
  return (
    <div className='list-item panel'>
      <ContentLoader
        width={687}
        height={67}
        animate
        speed={1}
        primaryColor='#efefef'
        secondaryColor='#f5f5f5'
      >
        <rect id='Rectangle' x='0' y='0' width='148' height='26' rx='4' />
        <rect id='Rectangle' x='0' y='42' width='300' height='26' rx='4' />
        <circle id='Oval' cx='330' cy='54' r='12' />
        <circle id='Oval' cx='631.5' cy='37.5' r='6.5' />
        <rect id='Rectangle' x='632' y='7' width='55' height='12' rx='2' />
        <rect id='Rectangle' x='647' y='29' width='40' height='21' rx='3' />
      </ContentLoader>
    </div>
  )
}
