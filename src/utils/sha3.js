import Web3 from 'web3'

const web3 = new Web3()

export function sha3(string) {
  return web3.utils.sha3(string)
}
