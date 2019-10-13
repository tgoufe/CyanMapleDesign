module.exports = {
  esDir: 'es',
  examplesPort: '8090',
  addons: [
    { folderName: 'index', path: 'src/maple/index.js' },
    { folderName: 'styleInit', path: 'src/maple/styleInit.js' }
  ],
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  env: process.env.NODE_ENV,
  resolve: ['.js', '.vue', '.json'],
  styleOutputPath: 'style',
  outputPath: 'lib',
  clearConsole: this.isProduct,
  externalMap: {
    vue: 'Vue',
    _: 'lodash'
  }
}
