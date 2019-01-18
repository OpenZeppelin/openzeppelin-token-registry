import { AbiMapping } from 'apollo-link-ethereum'
import VouchingAbi from './abi/VouchingAbi'
import Vouching from '#/Vouching.json'

export const abiMapping = new AbiMapping()

window.abiMapping = abiMapping

function addTruffleArtifact (name, abi, truffleJsonArtifact) {
  abiMapping.addAbi(name, abi)
  Object.keys(truffleJsonArtifact.networks).forEach(networkId => {
    abiMapping.addAddress(name, parseInt(networkId), truffleJsonArtifact.networks[networkId].address)
  })
}

addTruffleArtifact('Vouching', VouchingAbi, Vouching)
