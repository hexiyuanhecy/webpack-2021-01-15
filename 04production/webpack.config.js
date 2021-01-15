/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 11:24:35
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-15 17:44:21
 * @FilePath: \webpack-01-15\04production\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Development',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development'
}
