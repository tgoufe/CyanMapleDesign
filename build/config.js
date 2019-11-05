const { resolve } = require('./utils')
module.exports = {
  esDir: 'es',
  examplesPort: '8090',
  addons: [
    { folderName: 'index', path: 'src/maple/index.js' },
    { folderName: 'styleInit', path: 'src/maple/styleInit.js' }
  ],
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  env: process.env.NODE_ENV,
  alias: {
    '@components': resolve('src/maple/components'),
    '@maple': resolve('src/maple'),
    '@cyan': resolve('src/cyan'),
    '@theme': resolve('src/maple/theme'),
    '@assets': resolve('examples/assets')
  },
  resolve: ['.js', '.vue', '.json'],
  styleOutputPath: 'style',
  outputPath: 'lib',
  clearConsole: this.isProduct,
  externalMap: {
    _: 'lodash'
  }
}
