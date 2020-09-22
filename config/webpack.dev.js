const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
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
});