import { client } from '~/apollo/client'
import gql from 'graphql-tag'
import { abiMapping } from './abiMapping'
import { getClient } from '~/web3/getClient'

const eventSubscription = gql`
  subscription eventSubscription {
    Vouching @contract {
      Test @events
      Test2 @events
      blah: Test2 @events
    }
  }
`

/*

Test @events
Test2 @events
*/

client.subscribe({
  query: eventSubscription
}).subscribe({
  next: (data) => {
    console.log('new data1111: ', data)
  },
  error: (error) => {
    console.error(error)
  },
  complete: () => {
    console.log('complete 11111!')
  }
})

//
// client.subscribe({
//   query: eventSubscription
// }).subscribe({
//   next: (data) => {
//     console.log('new data2222: ', data)
//   },
//   error: (error) => {
//     console.error(error)
//   },
//   complete: () => {
//     console.log('complete 2222!')
//   }
// })
//
