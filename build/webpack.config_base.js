const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let {resolve}=require('./utils');
const path=require('path');
module.exports = {
    mode:'production',
    output: {
        filename: '[name].js',
        path: resolve('/CMUI'),
        libraryTarget: 'umd',
        library: 'cmui'
    },
    plugins: [
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    externals:{
        // 'lodash':'window._',
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    devServer: {
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "@components":path.resolve("src/maple/components"),
            "@methods":path.resolve("src/maple/methods"),
            "@cyan":path.resolve("src/cyan"),
        }
    },
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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: resolve('CMUI/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: resolve('CMUI/[name].[hash:7].[ext]')
                }
            }
        ]
    },
};
