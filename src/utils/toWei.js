import Web3 from 'web3'

export function toWei (ether) {
  if (!ether) {
    return ''
  }

  return new Web3().utils.toWei(ether, 'ether')
}
