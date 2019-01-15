import React, { PureComponent } from 'react'
import { PackageListItem } from './PackageListItem'

export class PackageList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      packages: [
        {
          name: 'OpenZeppelin-eth',
          version: '2.0.2',
          description: "OpenZeppelin is a library for secure smart contract development. It provides implementations of standards like ERC20 and ERC721 which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems."
        },
        {
          name: 'Gnosis Safe',
          version: '2.0',
          description: "Gnosis safe is ..."
        },
        {
          name: 'OpenZeppelin-eth',
          version: '2.0.1',
          description: "OpenZeppelin is a library for secure smart contract development. It provides implementations of standards like ERC20 and ERC721 which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems."
        },
        {
          name: 'EVMpackage',
          version: '0.4.0',
          description: "EVMpackage is ..."
        }
      ]
    }
  }

  render () {
    return (
      <>
        {this.state.packages.map(p => <PackageListItem package={p} key={p.name} />)}
      </>
    )
  }
}
