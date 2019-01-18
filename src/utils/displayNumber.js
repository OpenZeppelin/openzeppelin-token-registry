export const displayNumber = function (text) {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
