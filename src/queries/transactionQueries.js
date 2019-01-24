import gql from 'graphql-tag'

export const transactionQueries = {
  allTransactionsQuery: gql`
    query allTransactionsQuery {
      transactions {
        id
        hash
        txData {
          method
          args
          packageId
          amount
        }
      }
    }
  `,
  findTransactionQuery: gql`
    query findTransactionQuery($id: String!) {
      transaction(id: $id) {
        id
        hash
        txData {
          method
          args
          packageId
          amount
        }
      }
    }
  `
}
