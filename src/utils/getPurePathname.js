export const getPurePathname = function (pathname) {
  if (pathname === '/') {
    return 'home'
  } else {
    const match = pathname.match(new RegExp(/([\w-]+)/))

    if (match === null) {
      console.error('no match found for pathname: ' + pathname)
    } else {
      return match[0]
    }
  }
}
