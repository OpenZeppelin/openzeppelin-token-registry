/**
 * Converts any case sensitive Ethereum address (in Ethereum, case
 * sensitivity is used as an (optional) checksum) to it's lowercase
 * version, which is necessary in some cases.
 *
 * @returns {String}
 */
export function normalizeAddr (address) {
  if (!address) { return null }
  return address.toLowerCase()
}
