import { ethers } from 'ethers'
import { projectPackageVouchTotals } from '../projectPackageVouchTotals'
import * as eventFactory from './eventFactory'

describe('projectPackageVouchTotals', () => {
  it('should sum the vouches for a user', () => {
    let events = [
      eventFactory.Registered('0', '0x9999'),
      eventFactory.Vouched('0', '0xAbCd', '1000'),
      eventFactory.Vouched('1', '0x1234', '2000'),
      eventFactory.Unvouched('0', '0xabcd', '500')
    ]

    expect(projectPackageVouchTotals(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {
            '0xabcd': ethers.utils.bigNumberify(500)
          },
          vouchTotal: ethers.utils.bigNumberify(500),
          metadataURI: 'http://metadata.uri'
        },
        '1': {
          vouchTotals: {
            '0x1234': ethers.utils.bigNumberify(2000)
          },
          vouchTotal: ethers.utils.bigNumberify(2000),
          metadataURI: null
        }
      }
    })
  })

  it('should remove a user once the unvouch everything', () => {
    let events = [
      eventFactory.Registered('1', '0x2222'),
      eventFactory.Vouched('0', '0xAbCd', '1000'),
      eventFactory.Vouched('1', '0x2222', '1000'),
      eventFactory.Vouched('1', '0x3333', '1000'),
      eventFactory.Unvouched('0', '0xabcd', '1000')
    ]

    expect(projectPackageVouchTotals(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {},
          vouchTotal: ethers.utils.bigNumberify(0),
          metadataURI: null
        },
        '1': {
          vouchTotals: {
            '0x2222': ethers.utils.bigNumberify(1000),
            '0x3333': ethers.utils.bigNumberify(1000)
          },
          vouchTotal: ethers.utils.bigNumberify(2000),
          metadataURI: 'http://metadata.uri'
        }
      }
    })
  })
})
