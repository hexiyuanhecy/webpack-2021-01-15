<!--
 * @Description: 
 * @Author: hexy
 * @Date: 2021-01-22 16:24:43
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-22 16:26:09
 * @FilePath: \webpack-01-15\08env variable\readme.md
-->
环境变量
想要消除 webpack.config.js 在 开发环境 和 生产环境 之间的差异，你可能需要环境变量(environment variable)

webpack 命令行 环境配置 的 --env 参数，可以允许你传入任意数量的环境变量。而在 webpack.config.js 中可以访问到这些环境变量。

例如，--env production 或 --env NODE_ENV=local（NODE_ENV 通常约定用于定义环境类型，查看 这里）。

npx webpack --env NODE_ENV=local --env production --progress
// 若无赋值，则默认设置为true


通常，module.exports 指向配置对象。要使用 env 变量，你必须将 module.exports 转换成一个函数：

