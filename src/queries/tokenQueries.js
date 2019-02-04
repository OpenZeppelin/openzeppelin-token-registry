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
  zepTokenBalanceQuery: gql`
    query zepTokenBalanceQuery {
      zepTokenBalance @client
    }
  `,
  tokenQuery: gql`
    query tokenQuery($address: String!) {
      ZepToken @contract {
        ...tokenFragment
      }
    }
    ${tokenFragments.tokenFragment}
  `
}
// allEvents @pastEvents(fromBlock: 0, toBlock: "latest", extraTopics: { types: ["uint256"], values: [$address] })
// Transfer @events(extraTopics: { types: ["uint256"], values: [$address] })

// (type: "ERC20Token", id: "1")
