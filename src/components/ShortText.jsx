export function ShortText ({ text, maxLength = 200 }) {
  text = text || ''

  if (text.length > maxLength) {
    text = text.substring(0, maxLength)
    text += '...'
  }
  return text
}
