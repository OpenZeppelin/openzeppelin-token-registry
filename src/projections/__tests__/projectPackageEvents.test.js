import BN from 'bn.js'
import { projectPackageEvents } from '../projectPackageEvents'

function Vouched (id, sender, amount) {
  return {
    event: 'Vouched',
    returnValues: {
      id,
      sender,
      amount
    }
  }
}

function Unvouched (id, sender, amount) {
  return {
    event: 'Unvouched',
    returnValues: {
      id,
      sender,
      amount
    }
  }
}

function Registered (id, owner, amount) {
  return {
    event: 'Registered',
    returnValues: {
      id,
      owner,
      amount
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
            '0x9999': new BN(4000),
            '0xabcd': new BN(500)
          }
        },
        '1': {
          vouchTotals: {
            '0x1234': new BN(2000)
          }
        }
      }
    })
  })

  it('should remove a user once the unvouch everything', () => {
    let events = [
      Registered('1', '0x2222', '8000'),
      Vouched('0', '0xAbCd', '1000'),
      Unvouched('0', '0xabcd', '1000')
    ]

    expect(projectPackageEvents(events)).toEqual({
      packages: {
        '0': {
          vouchTotals: {}
        },
        '1': {
          vouchTotals: {
            '0x2222': new BN(8000)
          }
        }
      }
    })
  })
})
