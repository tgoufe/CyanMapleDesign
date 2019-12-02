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
    },
    wangyi: {
      entry: 'websiteDemo/163/main.js',
      template: 'public/index.html',
      filename: '163.html'
    },
    ximalaya: {
      entry: 'websiteDemo/ximalaya/main.js',
      template: 'public/index.html',
      filename: 'ximalaya.html'
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
    // config.module.rule('svg').uses.clear()
    function resolve(dir) {
      // 路径可能与你的项目不同
      return path.join(__dirname, dir)
    }
    config.module
      .rule('svg')
      .exclude.add(resolve('examples/icons/svg'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('examples/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'uifont-[name]'
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
    if (config.resolve.extensions && config.resolve.extensions.length) {
      config.resolve.extensions.push('.js', '.vue')
    } else {
      config.resolve.extensions = ['.js', '.vue']
    }

    config.resolve.alias.dom = path.resolve(__dirname, 'src/maple/methods/dom')
    console.log(config.resolve)
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
