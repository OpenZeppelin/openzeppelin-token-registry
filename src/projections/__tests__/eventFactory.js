import { ethers } from 'ethers'

export function Vouched (id, sender, amount) {
  return {
    parsedLog: {
      name: 'Vouched',
      values: {
        id: ethers.utils.bigNumberify(id),
        sender,
        amount: ethers.utils.bigNumberify(amount)
      }
    }
  }
}

export function Unvouched (id, sender, amount) {
  return {
    parsedLog: {
      name: 'Unvouched',
      values: {
        id: ethers.utils.bigNumberify(id),
        sender,
        amount: ethers.utils.bigNumberify(amount)
      }
    }
  }
}

export function Registered (id, owner) {
  return {
    parsedLog: {
      name: 'Registered',
      values: {
        id: ethers.utils.bigNumberify(id),
        owner
      }
    }
  }
}
