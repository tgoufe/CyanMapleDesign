const buildConfig = require('./build/config')
// const path = require('path')
module.exports = {
  publicPath: './',
  lintOnSave: !buildConfig.isProduct,
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    xiaohongshu: {
      entry: 'websiteDemo/xiaohongshu/main.js',
      template: 'public/index.html',
      filename: 'xiaohongshu.html'
    },
    wangyiyanxuan: {
      entry: 'websiteDemo/wangyiyanxuan/main.js',
      template: 'websiteDemo/wangyiyanxuan/index.html',
      filename: 'wangyiyanxuan.html'
    },
    elem: {
      entry: 'websiteDemo/elem/main.js',
      template: 'public/index.html',
      filename: 'elem.html'
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        // javascriptEnabled: true,
        // fiber: require('fibers')
      }
    }
  },
  chainWebpack: config => {
    // config.module
    //   .rule('js')
    //   .include.add(path.join(__dirname, 'src/maple'))
    //   .end()
    //   .use('babel')
    //   .loader('babel-loader')
    //   .tap((options) => {
    //     return options
    //   })
    let { alias } = buildConfig
    Object.keys(alias).forEach(item => {
      config.resolve.alias.set(item, alias[item])
    })
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
    // config.extensions = buildConfig.resolve
    config.output.chunkFilename('js/[name].js')
  },
  configureWebpack: config => {
    // if (buildConfig.isProduct) {
    //   config.externals = buildConfig.externalMap
    // }
  },
  devServer: {
    port: buildConfig.examplesPort,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pluginOptions: {
    // lintStyleOnBuild: true,
    // stylelint: {}
  }
}
