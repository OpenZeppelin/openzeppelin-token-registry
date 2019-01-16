let networkIds = null

export const allowedNetworkIds = function () {
  if (!networkIds) {
    networkIds = (process.env.REACT_APP_ALLOWED_NETWORK_IDS || '').split(/\s+/).map(id => parseInt(id, 10))
  }
  return networkIds
}
