/**
 * @param {object} obj
 * @returns {object} obj
 */
export default (obj?: any) => {
  const TRoute = useRoute()
  
  Object.keys(obj).forEach((key) => {
    const objValue = obj[key]
    if (objValue) return;
    delete obj[key]
  })

  return obj
}
