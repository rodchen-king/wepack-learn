const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:3000'
    }
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, 'src')],        // 指定检查的目录
        options: {                                        // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范，formatter默认是stylish，如果想用第三方的要另外安装
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ]
};