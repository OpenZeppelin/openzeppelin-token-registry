import gql from 'graphql-tag'

export const tokenFragments = {
  tokenFragment: gql`
    fragment tokenFragment on Token {
      id
      __typename
      myBalance: balanceOf(address: $address)
    }
  `,
  allowanceFragment: gql`
    fragment allowanceFragment on Token {
      id
      __typename
      allowance(from: $address, to: $spender)
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
  `,
  allowanceQuery: gql`
    query allowanceQuery($address: String!, $spender: String!) {
      ZepToken @contract {
        ...allowanceFragment
      }
    }
    ${tokenFragments.allowanceFragment}
  `
}
