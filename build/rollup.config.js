module.exports = {
    esDir: 'es',
    env: process.env.NODE_ENV,
    rollupFormatTypes:[
        { format: 'cjs', min: false, suffix: '.common.js' },
        { format: 'cjs', min: true, suffix: '.common.min.js' },
        { format: 'umd', min: false, suffix: '.umd.js' },
        { format: 'umd', min: true, suffix: '.umd.min.js' },
        { format: 'es', min: false, suffix: '.es.js' },
        { format: 'es', min: true, suffix: '.es.min.js' }
    ],
    addons: [
        {
            folderName: 'index',
            path: 'src/maple/index.js'
        },
        {
            folderName: 'styleInit',
            path: 'src/maple/styleInit.js'
        },
    ],
    styleOutputPath: 'style',
    outputPath: 'lib',
    clearConsole: ['production', 'prod'].includes(process.env.NODE_ENV),
    // 打包忽略
    externalMap: {
        vue: 'Vue',
        lodash:"_"
    },
    banner:`
        /*
         * Copyright © 2019-${new Date().getFullYear()} BingShanGroup
         * Released under the MIT License.
         */
    `
};
