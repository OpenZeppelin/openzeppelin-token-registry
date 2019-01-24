import gql from 'graphql-tag'

export const transactionQueries = {
  transactionsQuery: gql`
    query findByPackageId($packageId: ID!) {
      transactions(id: $packageId) {
        id
        packageId
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
