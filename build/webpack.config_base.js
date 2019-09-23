const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let {resolve}=require('./utils');
const path=require('path');
module.exports = {
    mode:'production',
    output: {
        filename: '[name].js',
        path: resolve('CMUI'),
    },
    plugins: [
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    externals:{
        'lodash':'window._',
    },
    devServer: {
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            jquery:resolve('dist/lib/jquery_3.2.1_jquery.min.js'),
            vue:resolve('dist/lib/vue_2.5.13_vue.min.js'),
            router:resolve('dist/lib/vue-router_3.0.1_vue-router.min.js'),
            flexible:resolve('dist/lib/flexible.js'),
            "@components":path.resolve("src/components"),
            "@methods":path.resolve("src/methods"),
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
                        presets: ['@babel/preset-env']
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