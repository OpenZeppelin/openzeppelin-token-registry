/**
 * Registers contract addresses (coming in via Truffle artifacts)
 * specific to this DApp and stores them in the abiMapping object.
 */

import { AbiMapping } from 'apollo-link-ethereum'
import VouchingAbi from './abi/VouchingAbi'
import ZepTokenAbi from './abi/ZepTokenAbi'
import Vouching from '#/Vouching.json'
import ZepToken from '#/ZepToken.json'

export const abiMapping = new AbiMapping()

window.abiMapping = abiMapping

function addTruffleArtifact (name, abi, truffleJsonArtifact) {
  abiMapping.addAbi(name, abi)
  Object.keys(truffleJsonArtifact.networks).forEach(networkId => {
    abiMapping.addAddress(name, parseInt(networkId), truffleJsonArtifact.networks[networkId].address)
  })
}

addTruffleArtifact('Vouching', VouchingAbi, Vouching)
addTruffleArtifact('ZepToken', ZepTokenAbi, ZepToken)
