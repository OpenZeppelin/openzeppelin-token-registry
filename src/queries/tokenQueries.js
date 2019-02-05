import gql from 'graphql-tag'

export const tokenFragments = {
  tokenFragment: gql`
    fragment tokenFragment on Token {
      id
      __typename
      myBalance: balanceOf(address: $address)
    }
  `
}

export const tokenQueries = {
  tokenQuery: gql`
    query tokenQuery($address: String!) {
      ZepToken @contract {
        ...tokenFragment
      }
    }
    ${tokenFragments.tokenFragment}
  `
}
