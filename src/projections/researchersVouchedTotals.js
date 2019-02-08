import { ethers } from 'ethers'
import { normalizeAddr } from '~/utils/normalizeAddr'

function getResearcher (result, address) {
  let researcher = result[address]
  if (!researcher) {
    researcher = {
      address,
      amount: ethers.utils.bigNumberify(0)
    }
    result[address] = researcher
  }
  return researcher
}

function getAmount (result, address) {
  return getResearcher(result, address).amount
}

function setAmount (result, address, amount) {
  getResearcher(result, address).amount = amount
}

// Iterates through all events in the Vouching contract and
// pull out amounts only for vouches (RegisteredEvent owners and
// VouchedEvent senders)
export const researchersVouchedTotals = function (events) {
  const result = {}

  for (let i in events) {
    const event = events[i]
    let { name, values } = event.parsedLog || {}
    let { amount, sender } = values || {}
    sender = normalizeAddr(sender)

    let currentTotal
    switch (name) {
      case 'Vouched':
        currentTotal = getAmount(result, sender)
        setAmount(result, sender, currentTotal.add(amount))
        break
      case 'Unvouched':
        currentTotal = getAmount(result, sender)
        setAmount(result, sender, currentTotal.sub(amount))
        break
      // no default
    }
  }

  return result
}
