import { stringToSlug } from '../stringToSlug'

describe('stringToSlug', () => {
  it('is true for these 3 cases', () => {
    expect(
      stringToSlug('OpenZeppelin-eth')
    ).toEqual('openzeppelin-eth')

    expect(
      stringToSlug('Gnosis Safe')
    ).toEqual('gnosis-safe')

    expect(
      stringToSlug('WithChars$7^2918)9(8*-_-_asdf)')
    ).toEqual('withchars-7-2918-9-8-asdf')
  })
})
