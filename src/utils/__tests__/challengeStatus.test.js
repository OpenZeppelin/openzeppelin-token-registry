import { challengeStatus } from '../challengeStatus'

describe('challengeStatus', () => {
  it('should work', () => {
    expect(challengeStatus(0, false, 0)).toEqual(0)
    expect(challengeStatus(0, true, 0)).toEqual(0)
    expect(challengeStatus(1, false, 0)).toEqual(1)
    expect(challengeStatus(2, false, 0)).toEqual(2)
    expect(challengeStatus(1, false, 3)).toEqual(3)
    expect(challengeStatus(2, false, 3)).toEqual(4)
    expect(challengeStatus(1, true, 0)).toEqual(5)
    expect(challengeStatus(2, true, 0)).toEqual(6)
    expect(challengeStatus(1, true, 1)).toEqual(4)
    expect(challengeStatus(1, true, 2)).toEqual(3)
    expect(challengeStatus(2, true, 1)).toEqual(3)
    expect(challengeStatus(2, true, 2)).toEqual(4)
  })
})
