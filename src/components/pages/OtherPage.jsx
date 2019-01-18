import React, { PureComponent } from 'react'

export const OtherPage = class _OtherPage extends PureComponent {
  render () {
    return (
      <>
        <div className='is-positioned-absolutely is-full-width'>
          <h1 className='is-size-1'>
            Page 2
          </h1>
        </div>
      </>
    )
  }
}

export const OtherPageContainer = OtherPage
