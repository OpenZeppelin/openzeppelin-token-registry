import React from 'react'
import { CodeBox } from '~/components/CodeBox'

export const PhaseOneHero = ({ heroColor }) => {
  return (
    <section className={`hero ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-lg-6'>
              <p className='is-size-5'>
                Introducing EVM packages: the most trusted on-chain libraries.
              </p>
              <p className='is-size-6'>
                EVM packages are reusable on-chain smart contract libraries, vetted by the open source community.
              </p>
            </div>
            <div className='col-xs-12 col-lg-5 col-start-lg-8'>
              <CodeBox />
              <p>
                <a href='https://docs.zeppelinos.org' target='_blank' rel='noopener noreferrer'>See EVM Package Docs &gt;</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
