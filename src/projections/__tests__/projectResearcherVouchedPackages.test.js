import { ethers } from 'ethers'
import { projectResearcherVouchedPackages } from '../projectResearcherVouchedPackages'
import * as eventFactory from './eventFactory'

const SENDER_ADDRESS = '0xAbCd'

describe('projectResearcherVouchedPackages', () => {
  it('should sum the vouches for a user', () => {
    let events = [
      eventFactory.Registered('0', SENDER_ADDRESS),
      eventFactory.Vouched('0', SENDER_ADDRESS, '500'),
      eventFactory.Vouched('1', SENDER_ADDRESS, '1000'),
      eventFactory.Vouched('1', '0x1234', '1234'),
      eventFactory.Vouched('1', SENDER_ADDRESS, '2000'),
      eventFactory.Unvouched('1', SENDER_ADDRESS, '750'),
      eventFactory.Vouched('2', SENDER_ADDRESS, '2200')
    ]

    // events.map(event => { console.log(event.parsedLog.values.amount && event.parsedLog.values.amount.toString()) })

    const packageItems = Object.values(projectResearcherVouchedPackages(SENDER_ADDRESS, events).packages)
    expect(packageItems).toEqual(
      [
        {
          id: ethers.utils.bigNumberify(0),
          vouchTotals: {
            '0xabcd': ethers.utils.bigNumberify(500)
          }
        },
        {
          id: ethers.utils.bigNumberify(1),
          vouchTotals: {
            '0xabcd': ethers.utils.bigNumberify(2250)
          }
        },
        {
          id: ethers.utils.bigNumberify(2),
          vouchTotals: {
            '0xabcd': ethers.utils.bigNumberify(2200)
          }
        }
      ]
    )
  })

  it('should remove a package if they have unvouched everything', () => {
    let events = [
      eventFactory.Registered('1', '0x2222'),
      eventFactory.Vouched('0', '0xAbCd', '1000'),
      eventFactory.Vouched('1', '0x2222', '1000')
    ]

    expect(projectResearcherVouchedPackages(SENDER_ADDRESS, events)).toEqual({
      packages: {
        0: {
          id: ethers.utils.bigNumberify(0),
          vouchTotals: {
            '0xabcd': ethers.utils.bigNumberify(1000)
          }
        }
      }
    })

    events.push(eventFactory.Unvouched('0', '0xabcd', '1000'))

    expect(projectResearcherVouchedPackages(SENDER_ADDRESS, events)).toEqual({
      packages: {}
    })
  })
})
