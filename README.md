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

### css抽取
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