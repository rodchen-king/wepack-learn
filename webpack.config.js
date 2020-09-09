const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // loader
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,  // node_modules 目录或者其他不需要编译的源代码 
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {       // 预设环境进行编译js，可以加入参数 https://www.jianshu.com/p/000c2670672b
              "targets": {
                "browsers": [
                  "Firefox > 86"
                ]
              }
            }]]
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ]
};