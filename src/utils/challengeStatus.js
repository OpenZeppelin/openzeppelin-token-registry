/*

# Challenge Status:

<answer> (<resolution>)

- Pending (open): Open
- Accepted (open): Acceptance Pending
- Rejected (open): Rejection Pending
- Accepted (confirmed): Challenge Accepted
- Rejected (confirmed): Challenge Rejected
- Accepted (appealed): Acceptance Appealed
- Rejected (appealed): Rejection Appealed
- Accepted (appeal affirmed): Challenge Rejected
- Accepted (appeal dismissed): Challenge Accepted
- Rejected (appeal affirmed): Challenge Accepted
- Rejected (appeal dismissed): Challenge Rejected

*/
export function challengeStatus (answer, isAppealed, resolution) {
  if (answer === 0) { return 0 }

  if (answer === 1) { // Accepted
    if (isAppealed) {
      switch (resolution) {
        case 1: // appeal affirmed
          return 4
        case 2: // appeal dismissed
          return 3
        default: // pending
          return 5
      }
    } else {
      switch (resolution) {
        case 3: // confirmed
          return 3
        default: // pending
          return 1
      }
    }
  } else { // Rejected
    if (isAppealed) {
      switch (resolution) {
        case 1: // appeal affirmed
          return 3
        case 2: // appeal dismissed
          return 4
        default: // pending
          return 6
      }
    } else {
      switch (resolution) {
        case 3: // confirmed
          return 4
        default: // pending
          return 2
      }
    }
  }
}
