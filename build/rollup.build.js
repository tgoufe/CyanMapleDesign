const fs = require('fs')
const chalk = require('chalk')
const { getAssetsPath, fsExistsSync, getFiles } = require('./utils')
const { esDir, outputPath, addons } = require('./config')
const { build } = require('./rollup.createConfig')
const inquirer = require('inquirer');

// creat folder

['', outputPath, esDir].forEach(item => {
  let _path = getAssetsPath(item)
  !fsExistsSync(_path) && fs.mkdirSync(_path)
})

let componentsList = getFiles('./src/maple/components')
  .filter(item => /index\.js$/.test(item.name))
let pkg = []
const inquirerInput = [
  {
    type: 'checkbox',
    message: '请选择打包文件结构:',
    name: 'format',
    choices: [
      new inquirer.Separator(`将打包到${outputPath}文件夹下`),
      new inquirer.Separator(`cjs用于使用import进行引用`),
      new inquirer.Separator(`umd用于使用使用script标签进行引用`),
      { name: 'cjs' },
      { name: 'umd', checked: true },
      new inquirer.Separator(`将打包到${esDir}文件夹下，用于现代浏览器的ES6引用`),
      { name: 'es' }
    ],
    validate(value, next) {
      if (!value.length) {
        return '请至少选择一项'
      }
      return true
    }
  }
]
inquirer.prompt(inquirerInput).then(({ format }) => {
  let rollupFormatTypes = []
  format.forEach(item => {
    rollupFormatTypes.push({
      format: item,
      min: false,
      suffix: `.${item === 'cjs' ? 'common' : item}.js`
    })
    if (item === 'umd') {
      rollupFormatTypes.push({
        format: item,
        min: true,
        suffix: `.${item}.min.js`
      })
    }
  })
  rollupFormatTypes.forEach(({ format, min, suffix } = {}) => {
    [...componentsList, ...addons].forEach(item => {
      pkg.push({
        min,
        format,
        suffix,
        moduleName: item.folderName,
        input: item.path
      })
    })
  })
  console.log(chalk.cyan(`============================`));
  [
    `CMUI打包程序即将开始`,
    `本次将对${componentsList.length}个组件，maple以及styleInit文件进行${rollupFormatTypes.length}种结构的打包`,
    `分别为${rollupFormatTypes.map(item => item.suffix.slice(1, -3)).join('    ')}`,
    `合计${pkg.length}个文件`
  ].forEach(item => {
    console.log(chalk.cyan(`\n${item}`))
  })
  console.log(chalk.cyan(`\n============================`))
  return inquirer.prompt([{
    type: 'confirm',
    message: '是否现在开始打包',
    name: 'buildNow'
  }])
}).then(({ buildNow }) => {
  buildNow && build(pkg)
})
