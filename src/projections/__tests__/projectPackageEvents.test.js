import { ethers } from 'ethers'
import { projectPackageEvents } from '../projectPackageEvents'
import * as eventFactory from './eventFactory'

describe('projectPackageEvents', () => {
  it('should sum the vouches for a user', () => {
    let events = [
      eventFactory.Registered('0', '0x9999'),
      eventFactory.Vouched('0', '0xAbCd', '1000'),
      eventFactory.Vouched('1', '0x1234', '2000'),
      eventFactory.Unvouched('0', '0xabcd', '500')
    ]

    expect(projectPackageEvents(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {
            '0xabcd': ethers.utils.bigNumberify(500)
          }
        },
        '1': {
          vouchTotals: {
            '0x1234': ethers.utils.bigNumberify(2000)
          }
        }
      }
    })
  })

  it('should remove a user once the unvouch everything', () => {
    let events = [
      eventFactory.Registered('1', '0x2222'),
      eventFactory.Vouched('0', '0xAbCd', '1000'),
      eventFactory.Vouched('1', '0x2222', '1000'),
      eventFactory.Unvouched('0', '0xabcd', '1000')
    ]

    expect(projectPackageEvents(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {}
        },
        '1': {
          vouchTotals: {
            '0x2222': ethers.utils.bigNumberify(1000)
          }
        }
      }
    })
  })
})
