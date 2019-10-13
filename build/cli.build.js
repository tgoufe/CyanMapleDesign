const { sh } = require('tasksfile')
const { getAssetsPath, getFiles } = require('./utils')
let componentsList = getFiles('./src/maple/components')
  .filter(item => /main\.vue$/.test(item.name))
function build(component) {
  sh(`vue-cli-service build --target lib --name ${component.folderName} --dest ${getAssetsPath('cli/')} ${component.path}`)
}
componentsList.forEach(build)
