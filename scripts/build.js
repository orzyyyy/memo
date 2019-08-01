const path = require('path');
const cwd = process.cwd();
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');

const plugins = [
  new CopyWebpackPlugin([
    {
      from: path.join(cwd, 'src/assets'),
      to: path.join(cwd, 'dist/assets'),
    },
    {
      from: path.join(cwd, '.circleci/config.yml'),
      to: path.join(cwd, 'dist/.circleci/config.yml'),
    },
    {
      from: path.join(cwd, 'src/pages/css'),
      to: path.join(cwd, 'dist/src/pages/css'),
    },
  ]),
  // new BundleAnalyzerPlugin(),
];

if (process.env.BUILD_ENV !== 'prod') {
  plugins.push(
    new PostCompile(() => {
      const socket = IO('http://localhost:9099');
      socket.emit('refresh');
    }),
  );
}

module.exports = {
  entry: {
    ninoninoni: path.join(__dirname, '../dist/src'),
    'react-base': ['react', 'react-dom'],
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
      },
    },
  },
};
