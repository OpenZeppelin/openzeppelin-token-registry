import Web3 from 'web3'

export function displayWeiToEther (wei) {
  if (!wei) {
    return ''
  }

  return new Web3().utils.fromWei(wei, 'ether')
}
