import { allowedNetworkIds } from '../allowedNetworkIds'

describe('allowedNetworkIds()', () => {
  it('should format the ids as an array of integers', () => {
    process.env['REACT_APP_ALLOWED_NETWORK_IDS'] = '1 2 3'

    expect(allowedNetworkIds()).toEqual([1, 2, 3])
  })
})
