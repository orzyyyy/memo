const path = require('path');
const cwd = process.cwd();
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
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
