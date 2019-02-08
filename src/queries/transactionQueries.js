import gql from 'graphql-tag'

export const transactionFragment = gql`
  fragment transaction on Transaction {
    id
    __typename
    args {
      values
    }
    contractName
    blockNumber
    completed
    error
    hash
    method
    sent
  }
`

export const transactionQueries = {
  transactionFragment,
  allTransactionsQuery: gql`
    query allTransactionsQuery {
      transactions @client {
        ...transaction
      }
    }
    ${transactionFragment}
  `
}
