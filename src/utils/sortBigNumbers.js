import { ethers } from 'ethers'
import _ from 'lodash'

// Sorts an array of objects with BN (bn.js big numbers) using a specific key
//
// [
//   { amount: '123' },
//   { amount: '4302' },
//   { amount: '1208' }
// ] => 123, 1208, 4302
//
export const sortBigNumbers = function (array, key) {
  _.mixin({
    sortWith: function (arr, customFn) {
      return _.map(arr).sort(customFn)
    }
  })

  return _.sortWith(
    array,
    (a, b) => {
      let order = -1

      if (ethers.utils.bigNumberify(a[key]).gte(ethers.utils.bigNumberify(b[key]))) {
        // console.log(`${a.amount} is greater than or equal to ${b.amount}`)
        order = 1
      }
      return order
    }
  )
}
