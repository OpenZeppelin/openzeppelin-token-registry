// import BN from 'bn.js'
import Web3 from 'web3'

const web3 = new Web3()

export function displayWeiToEther(wei) {
  if (!wei) { return '0' }
  return web3.utils.fromWei(wei, 'ether')
}
