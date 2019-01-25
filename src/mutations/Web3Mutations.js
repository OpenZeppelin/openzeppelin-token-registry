import gql from 'graphql-tag'

export const Web3Mutations = {
  sendTransaction: gql`
    mutation SendTransaction($txData: Object!) {
      sendTransaction(txData: $txData) @client
    }
  `
}
