import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'// 可在源码中通过process.env.NODE_ENV用于构建区分Development与Production环境
import { terser } from 'rollup-plugin-terser'// 压缩bundle文件
import postcss from 'rollup-plugin-postcss'

import alias from 'rollup-plugin-alias'

// PostCSS plugins
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssenv from 'postcss-preset-env'
import cssnano from 'cssnano'
export default {
  input: 'src/maple/index.js',
  output: {
    name: 'cmui',
    file: 'CMUI/index-r.js',
    format: 'umd',
    globals: {
      lodash: '_'
    }
  },
  external: ['lodash', 'vue'],
  plugins: [
    VuePlugin({
      exclude: 'node_modules/**'
    }),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssenv({
          warnForDuplicates: false
        }),
        cssnano()
      ],
      extensions: ['.css', '.scss']
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
      extensions: ['.js', '.vue', '.json']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      exclude: 'node_modules/**',
      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false
      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',
      // ignores indent and generates the smallest code
      compact: true, // Default: false
      // generate a named export for every property of the JSON object
      namedExports: true // Default: true
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    terser(),

    alias({
      resolve: ['.vue'],
      entries: {
        dom: 'src/maple/methods/dom.js'
      }
    })
  ]
}
