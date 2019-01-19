export const CHALLENGE_PRIORITY_LOW = 'Low'
export const CHALLENGE_PRIORITY_MEDIUM = 'Medium'
export const CHALLENGE_PRIORITY_HIGH = 'High'

export const CHALLENGE_STATUS_OPEN = 'Open'
export const CHALLENGE_STATUS_CLOSED = 'Closed'

export const SUCCESS = 'success'
export const GREY = 'grey'
export const INFO = 'info'
export const WARNING = 'warning'
export const DANGER = 'danger'

export const CHALLENGE_STATUS_COLORS = {
  [CHALLENGE_STATUS_OPEN]: SUCCESS,
  [CHALLENGE_STATUS_CLOSED]: GREY
}

export const CHALLENGE_PRIORITY_COLORS = {
  [CHALLENGE_PRIORITY_LOW]: INFO,
  [CHALLENGE_PRIORITY_MEDIUM]: WARNING,
  [CHALLENGE_PRIORITY_HIGH]: DANGER
}
