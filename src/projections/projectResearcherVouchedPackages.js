import { ethers } from 'ethers'
import { normalizeAddr } from '~/utils/normalizeAddr'

export function projectResearcherVouchedPackages (address, events) {
  let currentVouchTotal

  address = normalizeAddr(address)

  const result = {
    packages: {}
  }

  for (let i in events) {
    // use extraTopics to filter events based on user's eth address!
    const event = events[i]
    const { name, values } = event.parsedLog || {}
    const { id, amount, sender } = values || {}
    const addr = normalizeAddr(sender)

    // skip
    if (addr !== address) { continue }

    switch (name) {
      case 'Vouched':
        // Ensure an object exists
        result.packages[id] =
          result.packages[id] ||
            {
              id,
              vouchTotals: {}
            }

        currentVouchTotal = result.packages[id].vouchTotals[addr] || ethers.utils.bigNumberify(0)
        result.packages[id].vouchTotals[addr] = currentVouchTotal.add(ethers.utils.bigNumberify(amount))

        break
      case 'Unvouched':
        currentVouchTotal = result.packages[id].vouchTotals[addr]
        result.packages[id].vouchTotals[addr] = currentVouchTotal.sub(ethers.utils.bigNumberify(amount))

        if (result.packages[id].vouchTotals[addr].eq(ethers.utils.bigNumberify(0))) {
          delete result.packages[id]
        }

        break
      // no default
    }
  }

  return result
}
