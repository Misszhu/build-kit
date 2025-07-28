const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './examples/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), // 源 html 路径
      filename: 'index.html' // 输出到 dist 目录
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, '../dist/loaders/example-loader.js'),
            options: {
              prefix: '// 这是自定义前缀\n',
              suffix: '\n// 这是自定义后缀'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: path.resolve(__dirname, '../dist/loaders/hash-css-loader.js'),
            options: { hashLength: 8 }
          }
        ]
      }
    ]
  }
}; 