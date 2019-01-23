import gql from 'graphql-tag'

export const web3Mutations = {
  SEND_TRANSACTION: gql`
    mutation SendTransaction($web3Call: Object!) {
      sendTransaction(web3Call: $web3Call) @client
    }
  `
}
