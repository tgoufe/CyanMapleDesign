const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode:'production',
    entry: path.resolve(__dirname, './src/maple/index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './CMUI'),
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'postcss-loader','sass-loader'],
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: __dirname + 'node_modules',
                include: __dirname + 'src',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            }
        ]
    },
};