import React, { PureComponent } from 'react'
import { PackageListItem } from './PackageListItem'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import get from 'lodash.get'
import Vouching from '#/Vouching.json'
import { getNetworkAddress } from '~/utils/getNetworkAddress'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      allEvents @pastEvents
    }
  }
`

export class PackageList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      packages: [
        {
          name: 'OpenZeppelin-eth',
          version: '2.0.2',
          description: "OpenZeppelin is a library for secure smart contract development. It provides implementations of standards like ERC20 and ERC721 which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems."
        }
      ]
    }
  }

  render () {
    return (
      <Query
        query={eventsQuery}>
        {({ data }) => {
          console.log(data)
          return (
            <>
              {this.state.packages.map(p => <PackageListItem package={p} key={p.name} />)}
            </>
          )
        }}
      </Query>
    )
  }
}
