let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.config_base');
let {resolve}=require('./utils');
let entry={
    maple:resolve('src/maple/index.js'),
    demo:resolve('demo/index/index.js'),
};
module.exports = merge(baseWebpackConfig,{
    mode: "development",
    entry,
    output: {
        filename: '[name].js',
        path: resolve('CMUI'),
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'demo/index/index.html',
            inject: true,
            chunks:['demo','maple']
        }),
    ]
});