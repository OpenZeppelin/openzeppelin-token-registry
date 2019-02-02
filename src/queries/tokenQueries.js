import gql from 'graphql-tag'

export const tokenFragments = {
  tokenFragment: gql`
    fragment tokenFragment on Token {
      id
      __typename
      myBalance: balanceOf(address: $id)
      allEvents @pastEvents(fromBlock: 0, toBlock: "latest", extraTopics: { types: ["uint256"], values: [$id] })
    }
  `
}

export const tokenQueries = {
  tokenQuery: gql`
    query tokenQuery($id: String!) {
      ZepToken @contract(type: "ERC20Token", id: "1") {
        ...token

      }
    }
    ${tokenFragments.tokenFragment}
  `
}
