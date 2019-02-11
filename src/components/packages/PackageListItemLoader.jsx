import React from 'react'
import ContentLoader from 'react-content-loader'

export function PackageListItemLoader () {
  return (
    <div className='list-item__loader'>
      <ContentLoader
        width={400}
        height={200}
        animate
        speed={1}
        primaryColor='#efefef'
        secondaryColor='#f5f5f5'
        className='package-list-item--loader_mobile'
      >
        <rect id='Rectangle' x='0' y='0' width='60' height='60' rx='4' />

        <rect id='Rectangle' x='75' y='10' width='148' height='16' rx='4' />
        <rect id='Rectangle' x='75' y='32' width='300' height='16' rx='4' />

        <rect id='Rectangle' x='320' y='120' width='90' height='16' rx='4' />
      </ContentLoader>

      <ContentLoader
        width={400}
        height={200}
        animate
        speed={1}
        primaryColor='#efefef'
        secondaryColor='#f5f5f5'
        className='package-list-item--loader_tablet'
      >
        <rect id='Rectangle' x='0' y='0' width='60' height='60' rx='4' />

        <rect id='Rectangle' x='75' y='10' width='148' height='16' rx='4' />
        <rect id='Rectangle' x='75' y='32' width='300' height='16' rx='4' />

        <rect id='Rectangle' x='320' y='60' width='90' height='16' rx='4' />
      </ContentLoader>

      <ContentLoader
        width={687}
        height={90}
        animate
        speed={1}
        primaryColor='#efefef'
        secondaryColor='#f5f5f5'
        className='package-list-item--loader'
      >
        <rect id='Rectangle' x='14' y='32' width='30' height='26' rx='4' />
        <rect id='Rectangle' x='66' y='8' width='70' height='70' rx='4' />

        <rect id='Rectangle' x='160' y='10' width='148' height='26' rx='4' />
        <rect id='Rectangle' x='160' y='52' width='300' height='26' rx='4' />

        <rect id='Rectangle' x='590' y='30' width='90' height='26' rx='4' />

      </ContentLoader>
    </div>
  )
}

/* <circle id='Oval' cx='330' cy='54' r='12' />
<circle id='Oval' cx='631.5' cy='37.5' r='6.5' />
<rect id='Rectangle' x='632' y='7' width='55' height='12' rx='2' />
<rect id='Rectangle' x='647' y='29' width='40' height='21' rx='3' />
*/
