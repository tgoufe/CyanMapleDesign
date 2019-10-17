const buildConfig = require('./build/config')
const path = require('path')
module.exports = {
  publicPath: './',
  lintOnSave: !buildConfig.isProduct,
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        // javascriptEnabled: true,
        // fiber: require('fibers')
      }
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .include.add(path.join(__dirname, 'src/maple'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
    let { alias } = buildConfig
    Object.keys(alias).forEach(item => {
      config.resolve.alias.set(item, alias[item])
    })
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.extensions = buildConfig.resolve
  },
  configureWebpack: (config) => {
    if (buildConfig.isProduct) {
      config.externals = buildConfig.externalMap
    }
  },
  devServer: {
    port: buildConfig.examplesPort,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
}
