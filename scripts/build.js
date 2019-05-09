const path = require('path');
const cwd = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: path.join(cwd + '/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(cwd, 'src/mapping.json'),
        to: path.join(cwd, 'dist/mapping.json'),
      },
      {
        from: path.join(cwd, 'src/layout'),
        to: path.join(cwd, 'dist/layout'),
      },
      {
        from: path.join(cwd, 'src/assets'),
        to: path.join(cwd, 'dist/assets'),
      },
      {
        from: path.join(cwd, '.circleci/config.yml'),
        to: path.join(cwd, 'dist/.circleci/config.yml'),
      },
    ]),
  ],
};
