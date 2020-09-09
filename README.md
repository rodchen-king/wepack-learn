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