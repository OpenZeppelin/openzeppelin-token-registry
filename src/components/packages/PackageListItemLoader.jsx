import React from 'react'
import ContentLoader from 'react-content-loader'

export function PackageListItemLoader() {
  return (
    <div className='list-item panel'>
      <ContentLoader width={687} height={73} animate={false}>
        <path d="M18,43 L292,43 C301.941125,43 310,51.0588745 310,61 L310,61 C310,70.9411255 301.941125,79 292,79 L18,79 C8.0588745,79 1.21743675e-15,70.9411255 0,61 L0,61 C-1.21743675e-15,51.0588745 8.0588745,43 18,43 Z" id="Rectangle" fill="#F7F7F7"></path>
        <rect id="Rectangle" fill="#D6D6D6" x="0" y="0" width="148" height="31" rx="4"></rect>
        <circle id="Oval" fill="#7A7A7A" cx="330" cy="61" r="14"></circle>
        <circle id="Oval" fill="#131313" cx="631.5" cy="37.5" r="6.5"></circle>
        <rect id="Rectangle" fill="#788899" x="632" y="7" width="55" height="12" rx="2"></rect>
        <rect id="Rectangle" fill="#02C0DB" x="647" y="29" width="40" height="21" rx="3"></rect>
      </ContentLoader>
    </div>
  )
}
