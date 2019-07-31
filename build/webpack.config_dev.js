let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.config_base');
let {resolve}=require('./utils');
let entry={
    maple:resolve('src/maple/index.js'),
    demo:resolve('demo/index/index.js'),
    docDemo:resolve('demo/docDemo/index.js'),
};
module.exports = merge(baseWebpackConfig,{
    mode: "development",
    entry,
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'demo/index/index.html',
            inject: true,
            chunks:['demo','maple']
        }),
        new HtmlWebpackPlugin({
            filename: 'demo.html',
            template: 'demo/docDemo/index.html',
            inject: true,
            chunks:['docDemo','maple']
        }),
    ]
});