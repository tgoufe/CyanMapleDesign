const fs = require('fs')
const { getAssetsPath, fsExistsSync } = require('./utils')
const { esDir, outputPath, rollupFormatTypes, addons } = require('./config')
const { build } = require('./rollup.createConfig');
['', outputPath, esDir].forEach(item => {
  let _path = getAssetsPath(item)
  !fsExistsSync(_path) && fs.mkdirSync(_path)
})
let pkg = []
rollupFormatTypes.forEach(({ format, min, suffix } = {}) => {
  addons.forEach(item => {
    pkg.push({
      min,
      format,
      suffix,
      moduleName: item.folderName,
      input: item.path
    })
  })
})
build(pkg)
