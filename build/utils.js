const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
function getFiles(filePath, deep = true) {
  return fs.readdirSync(filePath).reduce((rs, i) => {
    let tpath = path.join(filePath, i)
    return rs.concat(
      fs.statSync(tpath).isDirectory()
        ? (deep ? getFiles(tpath) : [])
        : { path: tpath, name: i, folderName: path.basename(filePath) }
    )
  }, [])
}
function getFolders(filePath, deep = true) {
  return fs.readdirSync(filePath).reduce((rs, i) => {
    let tpath = path.join(filePath, i)
    if (!fs.statSync(tpath).isDirectory()) {
      return rs
    }
    return rs.concat({ path: tpath, name: i }, deep ? getFolders(tpath, deep) : [])
  }, [])
}
module.exports = {
  resolve: _path => path.join(__dirname, '..', _path),
  chalkConsole: {
    success: () => {
      console.log(chalk.green(`=========================================`))
      console.log(chalk.green(`========打包成功(build success)!=========`))
      console.log(chalk.green(`=========================================`))
    },
    building: (index, total) => {
      console.log(chalk.blue(`正在打包第${index}/${total}个文件...`))
    },
    begin(str) {
      console.log(chalk.green(`=========================================`))
      console.log(chalk.green(`========正在执行${str}!=========`))
      console.log(chalk.green(`=========================================`))
    }
  },
  fsExistsSync: (_path) => {
    try {
      fs.accessSync(_path, fs.F_OK)
    } catch (e) {
      return false
    }
    return true
  },
  getAssetsPath(_path = '.') {
    return path.posix.join('CMUI', _path)
  },
  getFiles,
  getFolders
}
