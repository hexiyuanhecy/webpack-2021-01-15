/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 11:24:35
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-22 17:12:19
 * @FilePath: \webpack-01-15\07build library\webpack.config.js
 */
/* const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ['source-map'].map(devtool => ({
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dirt'),
        // filename: '[name].[contenthash].bundle.js',
        filename: 'webpack-numbers.js',
        //  library 能够在各种使用环境中可用
        library: 'webpackNumbers',
        // 让 library 和其他环境兼容,以多种形式暴露library
        libraryTarget: 'umd',
    },
    devtool,
    plugins: [
        // 每次打包清空dist
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        // 以HTML为模板
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Caching',
        }),
    ],
    optimization: {
        // 修改A，B的hash也不会变
        // 为运行时代码创建了一个额外的 chunk，所以它的生成代价较低
        // 确保在生成 entry chunk 时，尽量减少其体积以提高性能。下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低：
        runtimeChunk: true,
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
})) */

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumbers',
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_',
        },
    },
};
