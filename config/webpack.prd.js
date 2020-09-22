const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = [
  merge(common, {
    target: 'node',
    devtool: 'source-map',
    output: {
      filename: 'lib.node.[contenthash].js'
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
  ,
  merge(common, {
    target: 'web',
    devtool: 'source-map',
    output: {
      filename: 'lib.[contenthash].js'
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
]