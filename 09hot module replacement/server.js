/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-18 10:50:15
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-18 11:03:03
 * @FilePath: \webpack-01-15\04production\server.js
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('../05Code separation/node_modules/webpackDevMiddleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
    console.log('Example app listening on port 3000');
})
