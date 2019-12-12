const blackContext = require.context('./', true, /black\d\.jpg/)
const whiteContext = require.context('./', true, /black\d\.jpg/)
const cmContext = require.context('./', true, /cm\d\.jpg/)
export default {
  blackList: blackContext.keys().map(key => require(`${key}`)),
  whiteList: whiteContext.keys().map(key => require(`${key}`)),
  cmList: cmContext.keys().map(key => require(`${key}`))
}
