/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 11:24:35
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-18 14:18:42
 * @FilePath: \webpack-01-15\05Code separation\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',

    // entry: {
    //     index: {
    //         import: './src/index.js',
    //         dependOn: 'shared',
    //     },
    //     another: {
    //         import: './src/another-module.js',
    //         dependOn: 'shared',
    //     },
    //     shared: 'lodash'
    // },
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js',
    },
    // 映射到源代码
    devtool: 'inline-source-map',
    // 告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        // 每次打包清空dist
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        // 以HTML为模板
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: '代码分离',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    // 最佳化  
    /*     optimization: {
        // 防止重复 SplitChunksPlugin 插件将公共依赖模块提取到已有入口chunk或新chunk
        splitChunks: {
            chunks: 'all'
        },
        // HTML 引入多个入口需设置，否则会有重复打包问题
        // 将 runtime 代码拆分为一个单独的 chunk
        // runtimeChunk: 'single'
    } */
}
