export async function getMetamaskPermissions () {
  if (window && window.ethereum) {
    try {
      await window.ethereum.enable()
    } catch (error) {
      if (error !== 'User rejected provider access') {
        console.error(error)
      }
    }
  } else {
    console.error('Could not find `window` or `window.ethereum`')
  }
}
