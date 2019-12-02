const routerContext = require.context('./', true, /\.vue$/, 'lazy')
const path = require('path')
let folder = { base: [] }
let routerAdd = []
routerContext.keys().forEach(key => {
  let routerPath = '/' + key.slice(2, -4).replace(/\/(\w)/g, (w, $1) => $1.toUpperCase())
  routerPath = key.slice(1, -4)
  let fileName = key.slice(key.lastIndexOf('/') + 1, -4)
  let rs = {
    path: routerPath,
    name: fileName,
    module: routerContext(key).default
  }
  let folderName = path.dirname(key).replace(/^\.\/?/, '')
  if (folderName) {
    folder[folderName] = folder[folderName] || []
    folder[folderName].push(rs)
  } else {
    folder.base.push(rs)
  }
  routerAdd.push({
    path: routerPath,
    name: fileName,
    fullPath: key.slice(2)
  })
})

export default {
  routerContext,
  folder,
  routerAdd
}
