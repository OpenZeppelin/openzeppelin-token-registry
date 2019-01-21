import BN from 'bn.js'
import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { PackageListItem } from '~/components/packages/PackageListItem'
import { PackageListItemLoader } from '~/components/packages/PackageListItemLoader'
import { graphql, withApollo } from 'react-apollo'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      registeredEvents: Registered @pastEvents(fromBlock: "0", toBlock: "latest")
    }
  }
`

const totalVouchesQuery = gql`
  query totalVouchesQuery($id: String!) {
    Vouching @contract {
      totalVouched(id: $id)
    }
  }
`

export const PackageList = graphql(eventsQuery)(withApollo(class _PackageList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      totalVouches: []
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const events = this.eventsFromProps(this.props)
    if (Object.keys(this.state.totalVouches).length === events.length) {
      return
    }

    const { client } = this.props

    Promise.all(
      events.map(event => {
        const id = event.returnValues.id
        return (
          client.query({ query: totalVouchesQuery, variables: { id } })
            .then(result => {
              return {
                id,
                totalVouched: new BN(result.data.Vouching.totalVouched)
              }
            })
        )
      })
    ).then((results) => {
      var totalVouches = results.reduce((accumulator, result) => {
        accumulator[result.id] = result.totalVouched
        return accumulator
      }, {})

      this.setState({
        totalVouches
      })
    })
  }

  eventsFromProps (props) {
    const { data } = props
    return (data.Vouching ? data.Vouching.registeredEvents : []) || []
  }

  totalVouched (id) {
    return this.state.totalVouches[id] || new BN('0')
  }

  render () {
    const { loading, error } = this.props.data

    const packageListLoader =
      <React.Fragment>
        <PackageListItemLoader key='0' />
        <PackageListItemLoader key='1' />
        <PackageListItemLoader key='2' />
      </React.Fragment>

    if (loading) {
      return packageListLoader
    }

    if (error) {
      console.error(error)
      return 'There was an error fetching the data'
    }

    const events = this.eventsFromProps(this.props)

    if (Object.keys(this.state.totalVouches).length !== events.length) {
      return packageListLoader
    }

    const sortedEvents = events.sort((a, b) => {
      const idA = a.returnValues.id
      const idB = b.returnValues.id
      return this.totalVouched(idB).cmp(this.totalVouched(idA))
    })

    return (
      <React.Fragment>
        {
          sortedEvents.map((event, index) => {
            const id = event.returnValues.id
            return (
              <PackageListItem
                index={index}
                location={this.props.location}
                package={event.returnValues}
                key={id}
              />
            )
          })
        }
      </React.Fragment>
    )
  }
}))
