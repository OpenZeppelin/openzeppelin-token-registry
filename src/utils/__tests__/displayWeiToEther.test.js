import { displayWeiToEther } from '../displayWeiToEther'

describe('displayWeiToEther', () => {
  it('should format it correctly', () => {
    expect(displayWeiToEther('1000000000000000000')).toEqual('1')
  })

  it('should add commas', () => {
    expect(displayWeiToEther('1000000000000000000000000')).toEqual('1,000,000')
  })
})
