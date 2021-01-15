/*
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-15 11:24:35
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-15 15:58:46
 * @FilePath: \webpack-01-15\02resource-manage\webpack.config.js
 */
const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // webpack 5 内置的 Asset Modules,然而在我这里报错了！！！
                type: 'asset/resource'
                // use: 'file-loader'
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|TTF|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ]
    }
}
