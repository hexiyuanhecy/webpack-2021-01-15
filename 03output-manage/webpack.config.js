/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 11:24:35
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-15 17:38:53
 * @FilePath: \webpack-01-15\03output-manage\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    }, 
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: '管理输出',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development'
}
