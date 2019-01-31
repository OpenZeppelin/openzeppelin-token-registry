import React from 'react'
import { CodeBox } from '~/components/CodeBox'

export const PhaseOneHero = ({ heroColor }) => {
  return (
    <section className={`hero ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-5-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-4-widescreen is-offset-2-widescreen is-4-fullhd is-offset-2-fullhd'>
              {/*
              <h4 className='title hero--title is-size-4 is-hidden-touch'>
                ZeppelinOS Registry
              </h4>
              */}
              <p className='is-size-5'>
                Introducing EVM packages: the most trusted on-chain libraries.
              </p>
              <p className='is-size-6'>
                EVM packages are reusable on-chain smart contract libraries, vetted by the open source community.
              </p>
            </div>
            <div className='column is-5-tablet is-4-desktop is-offset-1-desktop is-3-widescreen is-3-fullhd is-offset-1-fullhd'>
              {/* <h5 className='title hero--title is-size-5'>
                How to use:
              </h5>
              */}
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
