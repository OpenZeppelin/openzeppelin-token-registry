import { words, toLower } from 'lodash'

export const stringToSlug = function (text) {
  return words(toLower(text)).join('-')
}
