export function getNetworkAddress(truffleJsonArtifact, networkId) {
    const network = truffleJsonArtifact.networks[`${networkId}`]
    if (!network) {
      return null
    }
    return network.address
}
