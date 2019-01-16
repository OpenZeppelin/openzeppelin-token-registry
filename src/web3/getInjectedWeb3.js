import Web3 from 'web3'

export function getInjectedWeb3() {
  let web3 = null
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    }
  } catch (error) {
    console.warn(error)
  }
  return web3
}
