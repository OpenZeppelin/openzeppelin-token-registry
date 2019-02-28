import { ethers } from 'ethers'
import { normalizeAddr } from '~/utils/normalizeAddr'

function emptyPackage () {
  return {
    vouchTotals: {},
    vouchTotal: ethers.utils.bigNumberify(0),
    metadataURI: null
  }
}

/**
 * Calculates the total vouched amounts for all packages passed in by
 * Ethereum log events. This is done by comparing 'Registered', 'Vouched'
 * and 'Unvouched' events and summing up the totals.
 *
 * @returns {Object}
 */
export function projectPackageVouchTotals (events) {
  let currentVouchTotal

  const result = {
    packages: {}
  }

  for (let i in events) {
    const event = events[i]
    let { name, values } = event.parsedLog || {}
    let { id, amount, sender, metadataURI } = values || {}
    let amountBN = ethers.utils.bigNumberify(amount || '0')

    switch (name) {
      case 'Registered':
        result.packages[id] = result.packages[id] || emptyPackage()
        result.packages[id].metadataURI = metadataURI

        break

      case 'Vouched':
        let addr = normalizeAddr(sender)
        // Ensure an object exists
        result.packages[id] = result.packages[id] || emptyPackage()

        currentVouchTotal = result.packages[id].vouchTotals[addr] || ethers.utils.bigNumberify(0)
        result.packages[id].vouchTotals[addr] = currentVouchTotal.add(amountBN)
        result.packages[id].vouchTotal = result.packages[id].vouchTotal.add(amountBN)

        break

      case 'Unvouched':
        addr = normalizeAddr(sender)

        currentVouchTotal = result.packages[id].vouchTotals[addr]
        result.packages[id].vouchTotals[addr] = currentVouchTotal.sub(amountBN)
        result.packages[id].vouchTotal = result.packages[id].vouchTotal.sub(amountBN)

        if (result.packages[id].vouchTotals[addr].eq(ethers.utils.bigNumberify(0))) {
          delete result.packages[id].vouchTotals[addr]
        }

        break
      // no default
    }
  }

  return result
}
