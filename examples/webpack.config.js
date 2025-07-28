const path = require('path');

module.exports = {
  mode: 'development',
  entry: './examples/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
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
      }
    ]
  }
}; 