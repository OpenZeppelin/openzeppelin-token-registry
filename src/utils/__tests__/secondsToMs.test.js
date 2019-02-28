import { secondsToMs } from '../secondsToMs'
import { bigNumberify } from '../bigNumberify'

describe('secondsToMs', () => {
  it('works with strings', () => {
    expect(secondsToMs('1')).toEqual(bigNumberify(1000))
  })

  it('works with numbers', () => {
    expect(secondsToMs(1)).toEqual(bigNumberify(1000))
  })

  it('works with big numbers', () => {
    expect(secondsToMs(bigNumberify(1))).toEqual(bigNumberify(1000))
  })

  it('ignores dates', () => {
    const date = new Date()
    expect(secondsToMs(date)).toEqual(date)
  })
})
