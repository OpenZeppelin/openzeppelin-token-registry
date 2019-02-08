import { ethers } from 'ethers'
import { researchersVouchedTotals } from '../researchersVouchedTotals'
import * as eventFactory from './eventFactory'

const EVENTS = [
  eventFactory.Registered('0', '0x9999'),
  eventFactory.Vouched('0', '0x7A8cda94b311F58291d6F9E681599c915E31c338', '748000000000000000000'),
  eventFactory.Vouched('1', '0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7', '32000000000000000000'),
  eventFactory.Vouched('0', '0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e', '416000000000000000000'),
  eventFactory.Unvouched('0', '0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e', '416000000000000000000')
]

describe('researchersVouchedTotals', () => {
  it('should return the expected values', () => {
    expect(
      researchersVouchedTotals(EVENTS)
    ).toEqual(
      {
        '0x7a8cda94b311f58291d6f9e681599c915e31c338': {
          address: '0x7a8cda94b311f58291d6f9e681599c915e31c338',
          amount: ethers.utils.bigNumberify('748000000000000000000')
        },
        '0x883e6b4c10520e2bc2d5deb78d8ae4c1f7752ce7': {
          address: '0x883e6b4c10520e2bc2d5deb78d8ae4c1f7752ce7',
          amount: ethers.utils.bigNumberify('32000000000000000000')
        },
        '0x8f7f92e0660dd92eca1fad5f285c4dca556e433e': {
          address: '0x8f7f92e0660dd92eca1fad5f285c4dca556e433e',
          amount: ethers.utils.bigNumberify('0')
        }
      }
    )
  })

  it('should work even if empty', () => {
    expect(
      researchersVouchedTotals([])
    ).toEqual({})
  })
})
