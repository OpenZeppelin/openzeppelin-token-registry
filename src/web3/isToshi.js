/**
  Checks to see if the user is using CoinBase Wallet
*/
export function isToshi () {
  return window && window.web3 && window.web3.currentProvider.isToshi
}
