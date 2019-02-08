/**
 * Determine the browser.
 * This function returns one of Brave, Chrome, Firefox, Safari, Opera
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */
const getBrowser = function (userAgent) {
  let browser = 'unknown'

  if (/OPR/i.test(userAgent)) {
    browser = 'Opera'
  } else if (/chrome/i.test(userAgent)) {
    browser = 'Chrome'
  } else if (/safari/i.test(userAgent)) {
    browser = 'Safari'
  } else if (/firefox/i.test(userAgent)) {
    browser = 'Firefox'
  }

  return browser
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', or 'unknown'.
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */
const getMobileOperatingSystem = function (userAgent) {
  let os = 'unknown'

  if (/android/i.test(userAgent)) {
    os = 'Android'
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    os = 'iOS'
  }

  return os
}

/**
 * Determine if Web3Available is available.
 *
 * @returns {Bool}
 */
const getWeb3Available = function (userAgent) {
  let isInstalled = false

  if (window.web3 || window.ethereum) {
    return true
  }

  return isInstalled
}

export function getSystemInfo () {
  let osInfo = {}

  if (navigator || window) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    osInfo = {
      mobileOS: getMobileOperatingSystem(userAgent), // Android or iOS
      browser: getBrowser(userAgent),
      hasWeb3Available: getWeb3Available()
    }
  }

  return osInfo
}
