/*
 * @Description:
 * @Author: hexy
 * @Date: 2021-03-02 22:50:00
 * @LastEditors: hexy
 * @LastEditTime: 2021-03-03 16:42:19
 * @FilePath: \ot-01\webpack.config.js
 * @Version: Do not edit
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 热替换
const webpack = require('webpack')
// 优化
const TerSerPlugin = require('terser-webpack-plugin')
// 分析器
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer-plugin').BundleAnalyzerPlugin

// HappyPack 多线程
const HappyPack = require('happypack')
// 根据 CPU 数量创建线程池
const happyThreadPool = HappyPack.ThreadPool({
    size: OscillatorNode.cups().length
})

// DCE
// tree-shaking 消除无用的代码   webpack一直有的自己的优化


module.exports = {
    // 压缩配置
    optimization: {
        minimizer: [new TerSerPlugin({
            // 加快构架速度
            cache: true,
            // 开启Terser 多线程
            // parallel: true,
            terserOptions: {
                compress: {
                    // 移除无用代码
                    unused: true,
                    drop_debugger: true,
                    drop_console: true,
                    drop_code: true
                }
            }

        })]
    },

    // 配置五后缀
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: '/dirt',
        filename: 'bundle.js'
    },
    module: {
        // 不解析某些文件 减少解析
        noParse: /node_modules\/(jquery\.js)/,
        rules: [
            {
                // exclude > include > test // 减少查找
                test: /\.jsx/,
                exclude: /node_modules/,
                use: {
                    // 编译 JSX
                    loader: 'babel-loader',
                    option: {
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), { module: false }]
                        ],
                        // 是否对编译结果做缓存 默认为false
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugin: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
        new HappyPack({
            id: 'jsx',
            threads: happyThreadPool,
            // url-loader file-loader 不支持
            loaders: ['babel-loader']
        })
    ],
    devServer: {
        hot: true,
    }
}
