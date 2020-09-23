const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  target: 'web',
  // devtool: 'none',
  // devtool: 'source-map',
  // devtool: 'hidden-source-map',
  devtool: 'nosources-source-map',
  output: {
    filename: '[name].[hash].js'
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
})