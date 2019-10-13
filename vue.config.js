const buildConfig = require('./build/config')
module.exports = {
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
    extract: false
    // loaderOptions: {
    //   sass: {
    //     javascriptEnabled: true
    //   }
    // }
  },
  chainWebpack: (config) => {
    // config.module
    //   .rule('js')
    //   .include.add(/src/)
    //   .use('babel')
    //   .loader('babel-loader')
    //   .tap((options) => {
    //     return options
    //   }).end()
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
