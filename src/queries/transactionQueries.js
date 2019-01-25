import gql from 'graphql-tag'

const transactionFragment = gql`
  fragment transaction on Transaction {
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
        ...transaction
      }
    }
    ${transactionFragment}
  `,
  getUncompletedTransactionsByPackageId: gql`
    query getUncompletedTransactionsByPackageId($packageId: String!) {
      getUncompletedTransactionsByPackageId(packageId: $packageId) @client {
        ...transaction
      }
    }
    ${transactionFragment}
  `
}

window.gql = gql
