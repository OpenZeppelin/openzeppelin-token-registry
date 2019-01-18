import { researchersVouchedTotals } from '../researchersVouchedTotals'

const EVENTS = [
  {
    "returnValues": {
      "amount": "88000000000000000000",
      "owner": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
      "vouched": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    }
  },
  {
    "returnValues": {
      "amount": "90000000000000000000",
      "challenger": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7"
    }
  },
  {
    "returnValues": {
      "amount": "100000000000000000000",
      "owner": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
      "vouched": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    }
  },
  {
    "returnValues": {
      "amount": "42000000000000000000",
      "challenger": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7"
    }
  },
  {
    "returnValues": {
      "amount": "17000000000000000000",
      "challenger": "0x7A8cda94b311F58291d6F9E681599c915E31c338"
    }
  },
  {
    "returnValues": {
      "amount": "20000000000000000000",
      "owner": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
      "vouched": "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
    }
  },
  {
    "returnValues": {
      "amount": "16000000000000000000",
      "sender": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7"
    }
  },
  {
    "returnValues": {
      "amount": "308000000000000000000",
      "sender": "0x7A8cda94b311F58291d6F9E681599c915E31c338"
    }
  },
  {
    "returnValues": {
      "amount": "88000000000000000000",
      "owner": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
      "vouched": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    }
  },
  {
    "returnValues": {
      "amount": "90000000000000000000",
      "challenger": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7"
    }
  },
  {
    "returnValues": {
      "amount": "100000000000000000000",
      "owner": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
      "vouched": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    }
  },
  {
    "returnValues": {
      "amount": "42000000000000000000",
      "challenger": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7"
    }
  },
  {
    "returnValues": {
      "amount": "17000000000000000000",
      "challenger": "0x7A8cda94b311F58291d6F9E681599c915E31c338"
    }
  },
  {
    "returnValues": {
      "amount": "20000000000000000000",
      "owner": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
      "vouched": "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
    }
  },
  {
    "returnValues": {
      "amount": "16000000000000000000",
      "sender": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7"
    }
  },
  {
    "returnValues": {
      "amount": "440000000000000000000",
      "sender": "0x7A8cda94b311F58291d6F9E681599c915E31c338"
    }
  }
]

describe('researchersVouchedTotals', () => {
  it('should return the expected values', () => {
    expect(
      researchersVouchedTotals(EVENTS)
    ).toEqual(
      {
        "0x7A8cda94b311F58291d6F9E681599c915E31c338": {
          "address": "0x7A8cda94b311F58291d6F9E681599c915E31c338",
          "amount": "748000000000000000000"
        },
        "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7": {
          "address": "0x883E6B4C10520E2bc2D5dEB78d8AE4C1f7752ce7",
          "amount": "32000000000000000000"
        },
        "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e": {
          "address": "0x8f7F92e0660DD92ecA1faD5F285C4Dca556E433e",
          "amount": "416000000000000000000"
        }
      }
    )
  })

  it('should work even if empty', () => {
    expect(
      researchersVouchedTotals([])
    ).toEqual({})
  })
})
