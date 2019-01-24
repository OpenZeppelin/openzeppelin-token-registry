import gql from 'graphql-tag'

const transactionFragment = gql`
  fragment myTransaction on Transaction {
    hash
    method
    args
    packageId
    amount
    completed
  }
`

export const transactionQueries = {
  allTransactionsQuery: gql`
    query allTransactionsQuery {
      transactions @client {
        ...myTransaction
      }
    }
    ${transactionFragment}
  `,
  getUncompletedTransactionsByPackageId: gql`
    query getUncompletedTransactionsByPackageId($packageId: String!) {
      getUncompletedTransactionsByPackageId(packageId: $packageId) @client {
        ...myTransaction
      }
    }
    ${transactionFragment}
  `
}

window.gql = gql
