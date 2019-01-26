import BN from 'bn.js'
import { ethers } from 'ethers'

const BN_1 = new BN.BN(-1)

function _bnify (value) {
  let hex = value._hex
  if (hex[0] === '-') {
    return (new BN.BN(hex.substring(3), 16)).mul(BN_1)
  }
  return new BN.BN(hex.substring(2), 16)
}

ethers.utils.BigNumber.prototype.cmp = function (other) {
  return _bnify(ethers.utils.bigNumberify(other)).cmp(_bnify(this))
}
