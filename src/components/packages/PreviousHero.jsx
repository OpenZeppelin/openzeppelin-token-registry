import React from 'react'

export const PreviousHero = ({ heroColor }) => {
  let heroButtonColor = 'is-light'

  if (heroColor === 'is-light') { heroButtonColor = 'is-black' }

  return (
    <section className={`hero ${heroColor}`}>
      <div className='hero-body'>
        <div className='container-fluid'>
          <div className='has-text-centered'>
            <h2 className='title hero--title is-size-1'>
              {/* zeppelin<span className='has-text-primary'>OS</span> Beta */}
              zeppelinOS Beta
            </h2>
            <p className='is-size-6'>
              Interested in developing your own EVM package?
              <br />
              Want to vouch for your favourite libraries?
            </p>
            <br />
            <p>
              <button className={`button is-pill ${heroButtonColor}`}>Sign me up!</button>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
