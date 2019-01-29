import React from 'react'

export const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>
      <br />
      <h2 className='title has-half-margin is-size-2 has-text-weight-normal'>
        There was an issue:
      </h2>
      <h5 className='is-size-5 has-text-danger'>
        {errorMessage.toString()}
      </h5>

      <br />
      <h5 className='is-size-5 has-text-weight-normal has-text-grey-light'>
        Hint: You may be on the wrong Ethereum network.
      </h5>
    </div>
  )
}
