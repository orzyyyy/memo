const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const path = require('path');
const { compressJSON, getHtmlPluginProps, getEntry } = require(path.join(__dirname, './utils'));

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
  hotjar: '',
  googleAnalytics: '',
};

// Don't merge these plugins into utils, for customed plugins
const htmlPluginProps = getHtmlPluginProps(commonHtmlWebpackProps);

const plugins = [
  ...htmlPluginProps,
  new MomentLocalesPlugin({
    localesToKeep: ['zh-cn'],
  }),
  new PostCompile(() => {
    compressJSON();
  }),
];

module.exports = {
  entry: getEntry(),
  plugins,
};
