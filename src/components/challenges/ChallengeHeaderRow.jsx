import React from 'react'

export const ChallengeHeaderRow = () => {
  return (
    <li className='list--row list--row__head list--row_challenge'>
      <span className='list--cell list--cell__head'>
        Name
      </span>
      <span className='list--cell list--cell__head'>
        Status
      </span>
      <span className='list--cell list--cell__head'>
        Severity
      </span>
      <span className='list--cell list--cell__head'>
        Bounty
      </span>
      <span className='list--cell list--cell__head' />
      <span className='list--cell list--cell__head' />
    </li>
  )
}
