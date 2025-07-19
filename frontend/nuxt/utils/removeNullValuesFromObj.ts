export default (obj?: any) => {
  Object.keys(obj).forEach((key) => {
    const objValue = obj[key]
    if (objValue) return;
    delete obj[key]
  })
  return obj
}
