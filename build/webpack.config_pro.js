let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.config_base');
let {resolve}=require('./utils');
let entry={
    index:resolve('src/maple/index.js')
};
module.exports = merge(baseWebpackConfig,{
    mode: "production",
    entry,
});