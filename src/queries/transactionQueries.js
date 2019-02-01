import gql from 'graphql-tag'

const transactionFragment = gql`
  fragment transaction on Transaction {
    id
    hash
    method
    args {
      _hex
    }
    packageId {
      _hex
    }
    amount {
      _hex
    }
    error
    completed
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
  `,
  getAllTransactionsByPackageId: gql`
    query getAllTransactionsByPackageId($packageId: String!) {
      getAllTransactionsByPackageId(packageId: $packageId) @client {
        ...transaction
      }
    }
    ${transactionFragment}
  `
}

window.gql = gql
