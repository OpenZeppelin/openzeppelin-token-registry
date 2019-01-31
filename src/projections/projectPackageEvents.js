import { ethers } from 'ethers'
import { normalizeAddr } from '~/utils/normalizeAddr'

export function projectPackageEvents (events) {
  let currentVouchTotal

  const result = {
    packages: {}
  }

  for (let i in events) {
    const event = events[i]
    let { name, values } = event.parsedLog || {}
    // let { id, amount, owner, sender } = values || {}
    let { id, amount, sender } = values || {}

    switch (name) {
      case 'Vouched':
        let addr = normalizeAddr(sender)
        // Ensure an object exists
        result.packages[id] =
          result.packages[id] ||
            {
              vouchTotals: {}
            }

        currentVouchTotal = result.packages[id].vouchTotals[addr] || ethers.utils.bigNumberify(0)
        result.packages[id].vouchTotals[addr] = currentVouchTotal.add(ethers.utils.bigNumberify(amount))

        break
      case 'Unvouched':
        addr = normalizeAddr(sender)

        currentVouchTotal = result.packages[id].vouchTotals[addr]
        result.packages[id].vouchTotals[addr] = currentVouchTotal.sub(ethers.utils.bigNumberify(amount))

        if (result.packages[id].vouchTotals[addr].eq(ethers.utils.bigNumberify(0))) {
          delete result.packages[id].vouchTotals[addr]
        }

        break
      // no default
    }
  }

  return result
}
