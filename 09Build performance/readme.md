<!--
 * @Description: 构建性能
 * @Author: hexy
 * @Date: 2021-01-22 16:30:30
 * @LastEditors: hexy
 * @LastEditTime: 2021-01-25 14:39:27
 * @FilePath: \webpack-01-15\09Build performance\readme.md
-->
# 构建性能
改进构建/编译性能的实用技巧。



---
## 通用环境
### 1. 更新到最新版本
webpack npm yarn 等版本的更新

### 2. loader
将 loader 应用于最少数量的必要模块

```
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        <!-- 通过使用 include 字段，仅将 loader 应用在实际需要将其转换的模块 -->
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

### 3.引导（bootstrap）
每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。

### 4. 解析
1. 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
2. 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
3. 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve.cacheWithContext: false。


### 4. dll
使用 DllPlugin 为更改不频繁的代码生成单独的编译结果。可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度。

### 5. 小即是快(smaller = faster) 
减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。

1. 使用数量更少/体积更小的 library。
2. 在多页面应用程序中使用 SplitChunksPlugin。
3. 在多页面应用程序中使用 SplitChunksPlugin ，并开启 async 模式。
4. 移除未引用代码。
5. 只编译你当前正在开发的那些代码。

### 6. worker 池(worker pool) 
thread-loader 可以将非常消耗资源的 loader 分流给一个 worker pool。

注意：不要使用太多的 worker，因为 Node.js 的 runtime 和 loader 都有启动开销。最小化 worker 和 main process(主进程) 之间的模块传输。进程间通讯(IPC, inter process communication)是非常消耗资源的。

### 7. 持久化缓存
在 webpack 配置中使用 cache 选项。使用 package.json 中的 "postinstall" 清除缓存目录。

### 8. 自定义 plugin/loader
对它们进行概要分析，以免在此处引入性能问题

### 9. Progress plugin
将 ProgressPlugin 从 webpack 中删除，可以缩短构建时间。请注意，ProgressPlugin 可能不会为快速构建提供太多价值，因此，请权衡利弊再使用。



## 开发环境
### 1. 增量编译
使用 webpack 的 watch mode(监听模式)。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使缓存失效。

在某些配置环境中，watch mode 会回退到 poll mode(轮询模式)。监听许多文件会导致 CPU 大量负载。在这些情况下，可以使用 watchOptions.poll 来增加轮询的间隔时间。


### 2. 在内存中编译
下面几个工具通过在内存中（而不是写入磁盘）编译和 serve 资源来提高性能：

1. webpack-dev-server
2. webpack-hot-middleware
3. webpack-dev-middleware

### 3. stats.toJson 加速 
webpack 4 默认使用 stats.toJson() 输出大量数据。除非在增量步骤中做必要的统计，否则请避免获取 stats 对象的部分内容。webpack-dev-server 在 v3.1.3 以后的版本，包含一个重要的性能修复，即最小化每个增量构建步骤中，从 stats 对象获取的数据量。

### 4. Devtool 
需要注意的是不同的 devtool 设置，会导致性能差异。

1. "eval" 具有最好的性能，但并不能帮助你转译代码。
2. 如果你能接受稍差一些的 map 质量，可以使用 cheap-source-map 变体配置来提高性能
3. 使用 eval-source-map 变体配置进行增量编译。

Tip:在大多数情况下，最佳选择是 eval-cheap-module-source-map。

### 5. 避免在生产环境下才会用到的工具 
某些 utility, plugin 和 loader 都只用于生产环境。例如，在开发环境下使用 TerserPlugin 来 minify(压缩) 和 mangle(混淆破坏) 代码是没有意义的。通常在开发环境下，应该排除以下这些工具：

- TerserPlugin
- [fullhash]/[chunkhash]/[contenthash]
- AggressiveSplittingPlugin
- AggressiveMergingPlugin
- ModuleConcatenationPlugin

### 6. 最小化 entry chunk 
webpack 只会在文件系统中输出已经更新的 chunk。某些配置选项（HMR, output.chunkFilename 的 [name]/[chunkhash]/[contenthash]，[fullhash]）来说，除了对已经更新的 chunk 无效之外，对于 entry chunk 也不会生效。

确保在生成 entry chunk 时，尽量减少其体积以提高性能。下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低：
```
module.exports = {
  // ...
  optimization: {
    runtimeChunk: true
  }
};
```
### 7. 避免额外的优化步骤 
webpack 通过执行额外的算法任务，来优化输出结果的体积和加载性能。这些优化适用于小型代码库，但是在大型代码库中却非常耗费性能：
```
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
```
### 8. 输出结果不携带路径信息 
webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。在 options.output.pathinfo 设置中关闭：
```
module.exports = {
  // ...
  output: {
    pathinfo: false,
  },
};
```

### 9. Node.js 版本 8.9.10-9.11.1 
Node.js v8.9.10 - v9.11.1 中的 ES2015 Map 和 Set 实现，存在 性能回退。webpack 大量地使用这些数据结构，因此这次回退也会影响编译时间。

之前和之后的 Node.js 版本不受影响。

### 10. TypeScript loader 
你可以为 loader 传入 transpileOnly 选项，以缩短使用 ts-loader 时的构建时间。使用此选项，会关闭类型检查。如果要再次开启类型检查，请使用 ForkTsCheckerWebpackPlugin。使用此插件会将检查过程移至单独的进程，可以加快 TypeScript 的类型检查和 ESLint 插入的速度。
```
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      },
    },
  ],
};
```

## 生产环境 

注意：不要为了很小的性能收益，牺牲应用程序的质量！在大多数情况下，优化代码质量比构建性能更重要。

### 1.多个 compilation 对象 
在创建多个 compilation 时，以下工具可以帮助到你：

parallel-webpack：它允许在一个 worker 池中运行 compilation。
cache-loader：可以在多个 compilation 之间共享缓存。
### 2.Source Maps 
source map 相当消耗资源。你真的需要它们？

---
## 工具相关问题 
下列工具存在某些可能会降低构建性能的问题：


### 1.Babel 
最小化项目中的 preset/plugin 数量。

### 2. TypeScript 
在单独的进程中使用 fork-ts-checker-webpack-plugin 进行类型检查。
配置 loader 跳过类型检查。
使用 ts-loader 时，设置 happyPackMode: true / transpileOnly: true。
### 3.Sass 
node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2。

