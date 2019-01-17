import BN from 'bn.js'
import { normalizeAddr } from '~/utils/normalizeAddr'

export function projectPackageEvents(events) {
  const result = {
    packages: {}
  }

  for (var i in events) {
    const event = events[i]
    var { id, amount } = event.returnValues
    switch (event.event) {
      case 'Registered':
        var { owner } = event.returnValues
        var addr = normalizeAddr(owner)

        // Ensure an object exists
        result.packages[id] =
          result.packages[id] ||
          {
            vouchTotals: {}
          }

        var currentVouchTotal = result.packages[id].vouchTotals[addr] || new BN(0)
        result.packages[id].vouchTotals[addr] = currentVouchTotal.add(new BN(amount))

        break
      case 'Vouched':
        var { sender } = event.returnValues
        addr = normalizeAddr(sender)
        // Ensure an object exists
        result.packages[id] =
          result.packages[id] ||
          {
            vouchTotals: {}
          }

        currentVouchTotal = result.packages[id].vouchTotals[addr] || new BN(0)
        result.packages[id].vouchTotals[addr] = currentVouchTotal.add(new BN(amount))

        break
      case 'Unvouched':
        sender = event.returnValues.sender
        addr = normalizeAddr(sender)

        currentVouchTotal = result.packages[id].vouchTotals[addr]
        result.packages[id].vouchTotals[addr] = currentVouchTotal.sub(new BN(amount))

        if (result.packages[id].vouchTotals[addr].eq(new BN(0))) {
          delete result.packages[id].vouchTotals[addr]
        }

        break
      // no default
    }
  }

  return result
}
