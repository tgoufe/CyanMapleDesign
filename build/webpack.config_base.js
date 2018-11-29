const VueLoaderPlugin = require('vue-loader/lib/plugin');
let {resolve}=require('./utils');
let sourceList=['src/maple','src/cyan'].map(resolve);
module.exports = {
    mode:'production',
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            jquery:resolve('dist/lib/jquery_3.2.1_jquery.min.js'),
            lodash:resolve('dist/lib/lodash.js_4.17.4_lodash.min.js'),
            vue:resolve('dist/lib/vue_2.5.13_vue.min.js'),
            router:resolve('dist/lib/vue-router_3.0.1_vue-router.min.js'),
            flexible:resolve('dist/lib/flexible.js')
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
                include: sourceList,
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
                include: sourceList,
                options: {
                    limit: 10000,
                    name: resolve('CMUI/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                include: sourceList,
                options: {
                    limit: 10000,
                    name: resolve('CMUI/[name].[hash:7].[ext]')
                }
            }
        ]
    },
};