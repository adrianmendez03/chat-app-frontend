export const createObjectFromArray = (arr) => {
  const obj = {}
  arr.forEach((elem) => {
    obj[elem.id] = elem
  })
  return obj
}
