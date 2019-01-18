import BN from 'bn.js'

// Iterates through all events in the Vouching contract and
// pull out amounts only for vouches (RegisteredEvent owners and
// VouchedEvent senders)
export const researchersVouchedTotals = function (events) {
  const researchers = {}

  events.forEach((event, index) => {
    let address
    const { amount, owner, sender } = event.returnValues

    address = sender ? sender : owner
    if (!address) { return null }

    const researcherAlreadyPresent = (typeof researchers[address] !== 'undefined')

    researchers[address] = {
      address: address,
      amount: researcherAlreadyPresent ?
        new BN(researchers[address].amount).add(new BN(amount)).toString()
        : amount
    }
  })

  return researchers
}
