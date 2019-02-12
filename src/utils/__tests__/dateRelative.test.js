import { dateRelative } from '../dateRelative'
const tk = require('timekeeper')

const FROZEN_TIME = new Date(1549997377543)

describe('dateRelative', () => {
  it('should return the relative date', () => {
    tk.freeze(FROZEN_TIME)

    expect(dateRelative(1549997174543, FROZEN_TIME)).toEqual(expect.stringMatching(/today at \d{1,2}:46 (AM|PM)/))

    tk.reset()
  })

  it('should use the default current date as the future date if non supplied', () => {
    tk.freeze(FROZEN_TIME)

    expect(dateRelative(FROZEN_TIME - 100000000)).toEqual(expect.stringMatching(/yesterday at \d{1,2}:02 (AM|PM)/))

    tk.reset()
  })

  it('should return empty string without a proper unix timestamp', () => {
    expect(dateRelative()).toEqual('')
  })
})
