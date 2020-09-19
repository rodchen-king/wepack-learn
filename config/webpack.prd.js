const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  devtool: 'source-map',
  // output: {
  //   chunkFilename: '[name].[chunkhash:8].js'
  // },
  devServer: {
    contentBase: '../dist',
    proxy: {
      '/api': 'http://localhost:3000'
    }
   },
   optimization: {
    splitChunks: {
      cacheGroups: {
          vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'common',
              chunks: 'all'
          }
      }
    }
  },
   plugins: [
    new UglifyJsPlugin()
  ]
});