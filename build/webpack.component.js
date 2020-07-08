const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const _string = require('lodash/string');

const webpackCommonConfig = require('./webpack.common.js');
const components = require('./get-components')();

process.env.NODE_ENV = 'production';

const basePath = path.resolve(__dirname, '../');
const baseUrl = basePath + '/lib/styles/';

let entries = {};
Object.keys(components).forEach(key => {
    // 转换为 kebabCase 短横线连接方式
    const dashKey = _string.kebabCase(key);
    entries[dashKey] = path.join(basePath, '', components[key]);
    // 生成css文件
    // 组件中的style标签内容为空，或者无style标签时，webpack不生成对应的css文件
    if (!fs.existsSync(baseUrl)) fs.mkdirSync(baseUrl);
    fs.writeFileSync(baseUrl + dashKey + '.css', '');
});



module.exports = merge(webpackCommonConfig, {
    mode: 'production',
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/lib/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new OptimizeCssAssetsPlugin()
    ]
});

