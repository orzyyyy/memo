const CopyWebpackPlugin = require('copy-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const path = require('path');
const { compressJSON, getCopyPluginProps, getHtmlPluginProps, getEntry, convertMarkdown2Html } = require(path.join(
  __dirname,
  './utils',
));

const commonHtmlWebpackProps = {
  minify: {
    minifyJS: true,
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true,
  },
  environment: '',
  baseTag: '<base href="/">',
  socket: '',
  inject: 'body',
};

// Don't merge these plugins into utils, for customed plugins
const copyPluginProps = getCopyPluginProps();
const htmlPluginProps = getHtmlPluginProps(commonHtmlWebpackProps);

const plugins = [
  ...htmlPluginProps,
  new CopyWebpackPlugin(copyPluginProps),
  new PostCompile(() => {
    compressJSON();
    convertMarkdown2Html();
  }),
];

module.exports = {
  entry: getEntry(),
  plugins,
  output: { publicPath: '/memo/dist/', filename: '[name].[hash].js', chunkFilename: 'vendor/[name].[chunkhash].js' },
};
