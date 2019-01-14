import Web3 from 'web3'
import { getWeb3 } from '~/utils/getWeb3'
import { shallow, mount, render } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function (id) {
  clearTimeout(id)
}

window.scrollTo = function(){}
global.scrollTo = window.scrollTo

// Inject the Web3 instance with a localhost provider for integration specs
global.Web3 = Web3

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
global.window.web3 = new Web3(provider);
global.window.web3.eth.defaultAccount = global.window.web3.eth.accounts[0]

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount

Object.defineProperty(window, 'web3', { value: getWeb3 })

copyProps(window, global)
