import { ethers } from 'ethers'
import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { PackageListItem } from '~/components/packages/PackageListItem'
import { PackageListItemLoader } from '~/components/packages/PackageListItemLoader'
import { graphql, withApollo } from 'react-apollo'

const eventsQuery = gql`
  query eventsQuery {
    Vouching @contract {
      registeredEvents: Registered @pastEvents(fromBlock: 0, toBlock: "latest")
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
        const id = event.parsedLog.values.id
        return (
          client.query({ query: totalVouchesQuery, variables: { id } })
            .then(result => {
              return {
                id,
                totalVouched: result.data.Vouching.totalVouched
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
    const { Vouching } = data || {}
    return (Vouching ? Vouching.registeredEvents : []) || []
  }

  totalVouched (id) {
    return this.state.totalVouches[id] ? ethers.utils.bigNumberify(this.state.totalVouches[id].toString()) : ethers.utils.bigNumberify('0')
  }

  render () {
    const { loading, error } = this.props.data || {}

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
      const idA = a.parsedLog.values.id
      const idB = b.parsedLog.values.id
      return this.totalVouched(idA).cmp(this.totalVouched(idB))
    })

    return (
      <React.Fragment>
        {
          sortedEvents.map((event, index) => {
            const id = event.parsedLog.values.id
            return (
              <PackageListItem
                index={index}
                location={this.props.location}
                package={event.parsedLog.values}
                key={id}
              />
            )
          })
        }
      </React.Fragment>
    )
  }
}))
