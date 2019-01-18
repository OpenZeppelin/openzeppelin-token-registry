const expression = /^(\w{6})\w*(\w{2})$/

export function shortenAddress (address) {
  if (!address) { return null }
  var result = expression.exec(address)
  return `${result[1]}...${result[2]}`
}
