import { ethers } from 'ethers'

// Iterates through all events in the Vouching contract and
// pull out amounts only for vouches (RegisteredEvent owners and
// VouchedEvent senders)
export const researchersVouchedTotals = function (events) {
  const researchers = {}

  events.forEach((event, index) => {
    let address
    const { amount, owner, sender } = event.parsedLog.values

    address = sender || owner
    if (!address) { return null }

    const researcherAlreadyPresent = (typeof researchers[address] !== 'undefined')

    researchers[address] = {
      address: address,
      amount: researcherAlreadyPresent
        ? ethers.utils.bigNumberify(researchers[address].amount).add(ethers.utils.bigNumberify(amount)).toString()
        : amount
    }
  })

  return researchers
}
