const path = require('path');
const cwd = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(cwd + '/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '../index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
