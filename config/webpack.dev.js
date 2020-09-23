const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval',
  // devtool: 'eveal-source-map',
  // devtool: 'cheap-eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist1',
    hot: true,
    inline: true,
    port: 8081,
    host: "0.0.0.0",
    disableHostCheck: true,
    clientLogLevel: 'none',
    compress: true,
    open: false,
    https: true,
    headers: {
      'X-foo':'bar'
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
   },
   watch: true,
   watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms  
    aggregateTimeout: 3000,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每秒轮询1000次
    poll: 1000
  }
});