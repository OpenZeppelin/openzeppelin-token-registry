import { ethers } from 'ethers'
import { projectPackageEvents } from '../projectPackageEvents'

function Vouched (id, sender, amount) {
  return {
    parsedLog: {
      name: 'Vouched',
      values: {
        id,
        sender,
        amount: ethers.utils.bigNumberify(amount)
      }
    }
  }
}

function Unvouched (id, sender, amount) {
  return {
    parsedLog: {
      name: 'Unvouched',
      values: {
        id,
        sender,
        amount: ethers.utils.bigNumberify(amount)
      }
    }
  }
}

function Registered (id, owner, amount) {
  return {
    parsedLog: {
      name: 'Registered',
      values: {
        id,
        owner,
        amount: ethers.utils.bigNumberify(amount)
      }
    }
  }
}

describe('projectPackageEvents', () => {
  it('should sum the vouches for a user', () => {
    let events = [
      Registered('0', '0x9999', '4000'),
      Vouched('0', '0xAbCd', '1000'),
      Vouched('1', '0x1234', '2000'),
      Unvouched('0', '0xabcd', '500')
    ]

    expect(projectPackageEvents(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {
            '0x9999': ethers.utils.bigNumberify(4000),
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
      Registered('1', '0x2222', '8000'),
      Vouched('0', '0xAbCd', '1000'),
      Vouched('1', '0x2222', '1000'),
      Unvouched('0', '0xabcd', '1000')
    ]

    expect(projectPackageEvents(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {}
        },
        '1': {
          vouchTotals: {
            '0x2222': ethers.utils.bigNumberify(9000)
          }
        }
      }
    })
  })
})
