const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const image = require('rollup-plugin-img')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const replace = require('rollup-plugin-replace')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const alias = require('rollup-plugin-alias')
const cssenv = require('postcss-preset-env')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const fs = require('fs')

const { getAssetsPath, fsExistsSync, chalkConsole } = require('./utils')
const {
  esDir,
  env,
  styleOutputPath,
  outputPath,
  externalMap,
  banner
} = require('./config')
const isEs = (fmt) => fmt === esDir

function createPlugins({ min } = {}) {
  const exclude = 'node_modules/**'
  const plugins = [
    commonjs(),
    vue({
      css: false
    }),
    json(),
    resolve({
      extensions: ['.js', '.vue', '.json']
    }),
    babel({
      runtimeHelpers: true,
      // plugins: ['@babel/plugin-external-helpers'],
      externalHelpers: false,
      exclude,
      presets: ['@babel/preset-env']
    }),
    image({
      hash: false,
      output: getAssetsPath('/img'), // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192, // default 8192(8k)
      exclude
    }),
    postcss({
      plugins: [simplevars(), nested(), cssenv({ warnForDuplicates: false }), cssnano()],
      use: [
        ['sass', { javascriptEnabled: true }]
      ],
      // inject: true,
      extensions: ['.css', '.scss']
      // extract: false
    }),
    replace({
      exclude,
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    alias({
      resolve: ['.js', '.vue', '.json']
    })
  ]
  if (min) {
    plugins.push(terser())
  }
  return plugins
}
function build(builds) {
  let buildCount = 0
  const total = builds.length
  const next = async () => {
    chalkConsole.building(buildCount + 1, total)
    await buildEntry(builds[buildCount])
    buildCount++
    buildCount < total ? next() : chalkConsole.success()
  }
  next()
}
async function buildEntry(config) {
  const { suffix, input, format, moduleName } = config
  const inputOptions = {
    input,
    external: Object.keys(externalMap),
    plugins: createPlugins(config)
  }
  const fullName = `${isEs(format) ? esDir : outputPath}/${moduleName + suffix}`
  const file = getAssetsPath(fullName)
  const outOptions = {
    file,
    format,
    name: moduleName,
    globals: externalMap
  }
  const bundle = await rollup.rollup(inputOptions)
  // await bundle.generate(outOptions);
  // await bundle.write(outOptions);
  let { output: outputData } = await bundle.generate(outOptions)
  bundle.write(outOptions)
  await write({ output: outputData, fileName: moduleName, format, fullName, file })
}
async function write({ output, file, fileName, format, fullName } = {}) {
  return
  for (const { isAsset, code, source } of output) {
    if (isAsset) {
      const cssFileName = `${fileName}.css`
      const filePath = isEs(format)
        ? getAssetsPath(`/${es}/${cssFileName}`)
        : getAssetsPath(`/${styleOutputPath}/${cssFileName}`)

      !fsExistsSync(filePath) && fs.writeFileSync(filePath, banner + source.toString())
    } else {
      const filePath = isEs(format) ? getAssetsPath(`/${es}/${fullName}`) : file
      let codeSource = code.replace(/\s?const\s/g, ' var ')
      fs.writeFileSync(filePath, banner + codeSource)
    }
  }
}
module.exports = {
  build
}
