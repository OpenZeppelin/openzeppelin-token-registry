import React from 'react'
import { CodeBox } from '~/components/CodeBox'

export const PhaseOneHero = ({ heroColor }) => {
  return (
    <section className={`hero ${heroColor}`}>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-2-widescreen is-4-fullhd is-offset-2-fullhd'>
              <h4 className='title hero--title is-size-4 is-hidden-touch'>
                ZeppelinOS Registry
              </h4>
              <p>
                Introducing the list of most trusted on on-chain EVM packages.
              </p>
              <p>
                EVM packages are reusable on-chain smart contract libraries, vetted by the open source community.
              </p>
            </div>
            <div className='column is-4-desktop is-offset-1-desktop is-3-widescreen is-3-fullhd is-offset-1-fullhd'>
              <div className=''>
                <h5 className='title hero--title is-size-5'>
                  How to use:
                </h5>
                <CodeBox />
                <p>
                  <a href='https://docs.zeppelinos.org'>See EVM Package Docs &gt;</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
