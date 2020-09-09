# wepack-learn  
webpack的学习分享  
<br>

#### 1. 初始创建项目  
***  
```  
npm init -y       

npm install webpack webpack-cli --save-dev

npm install --save-dev style-loader css-loader
```  

```
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
},
```

<br>

### 2. babel-loader
***
```
npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
```

```
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
```

babel-preset-env 的主要参数选项有：
* targets
* targets.node
* targets.browsers
* spec : 启用更符合规范的转换，但速度会更慢，默认为 false
* loose：是否使用 loose mode，默认为 false
* modules：将 ES6 module 转换为其他模块规范，可选 "adm" | "umd" | "systemjs" | "commonjs" | "cjs" | false，默认为 false
* debug：启用debug，默认 false
* include：一个包含使用的 plugins 的数组
* exclude：一个包含不使用的 plugins 的数组
* useBuiltIns：为 polyfills 应用 @babel/preset-env ，可选 "usage" | "entry" | false，默认为 false

<br>

### 3. css抽取
***
```
npm install --save-dev mini-css-extract-plugin
```

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module: {
  rules: [
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }
  ]
},
plugins: [
  new MiniCssExtractPlugin(),
]
```

<br>

### 4. html的处理：复制并压缩html文件
***
```
npm install --save-dev html-webpack-plugin
```
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin()
]
```

<br>

### 5. 打包文件处理
***
```
npm install --save-dev clean-webpack-plugin
```
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  plugins: [
    new CleanWebpackPlugin()
  ]
```

<br>

### 6. 加载静态资源，图片，数据，字体
***
```
npm install --save-dev file-loader
npm install --save-dev csv-loader xml-loader
```
```
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
```

<br>

### 7. development 模式下启动服务器并实时刷新
***
```
npm install --save-dev webpack-dev-server
```
```
module.exports = {
  devServer: {
    contentBase: './dist'
   }
}
```
```
"scripts": {
  "start": "webpack-dev-server --open",
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"
}
```

<br>

### 8. source-map本地查看源代码调试
***
```
module.exports = {
  devtool: 'inline-source-map',
}
```

<br>

### 9. eslint
***
```
npm install eslint-loader --save-dev
npm install eslint --save-dev
npm install eslint-friendly-formatter --save
```
```
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    include: [path.resolve(__dirname, 'src')],        // 指定检查的目录
    options: {                                        // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
      formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范，formatter默认是stylish，如果想用第三方的要另外安装
    }
  }
}
```
```
module.exports = {
  'root': true,
  'plugins': [
      'html'
  ],
  'settings': {
      'html/html-extensions': ['.wxml']
  },
  'rules': {
      'newline-per-chained-call': 'off',
      'eqeqeq': 'off',
      'indent': ['error', 4, { SwitchCase: 1 }],
      'prefer-rest-params': 'off',
      'prefer-template': 'off',
      'array-callback-return': 'off',  // 暂时关闭
      'prefer-const': 'warn',
     

      'no-restricted-properties': [2, {
          'object': 'wx',
          'property': 'navigateTo',
          'message': 'Please use this.$goto!!!'
      }]
  }
}
```

<br>

### 10. 开发环境代码proxy
***
```
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

<br>

### 11. prd环境处理-文件拆分
***
```
npm install --save-dev webpack-merge
```
webpack.common.js文件
```
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',     // 相对根目录路径
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
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
```
webpack.dev.js & webpack.prd.js
```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    proxy: {
      '/api': 'http://localhost:3000'
    }
   },
});
```
package.json
```
"scripts": {
  "start": "webpack-dev-server --open --config ./config/webpack.dev.js",
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config ./config/webpack.prd.js"
},
```

<br>

### 12. prd代码压缩，提取公共模块
***
```
npm i -D uglifyjs-webpack-plugin
```
```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js'
  },
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
```