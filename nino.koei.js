const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');

const plugins = [
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, 'src/assets'),
      to: path.join(__dirname, 'dist/assets'),
    },
    {
      from: path.join(__dirname, '.circleci/config.yml'),
      to: path.join(__dirname, 'dist/.circleci/config.yml'),
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
    ninoninoni: path.join(__dirname, 'src'),
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
