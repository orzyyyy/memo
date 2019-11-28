const PostCompile = require('post-compile-webpack-plugin');
const path = require('path');
const { compressJSON, getHtmlPluginProps, getEntry } = require(path.join(__dirname, './utils'));
const IO = require('socket.io-client');
const open = require('open');

const socket = IO('http://localhost:9099');
let isBrowserExists = false;

const commonHtmlWebpackProps = {
  minify: {
    minifyJS: true,
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true,
  },
  environment: '<script>window.__isLocal = 1;</script>',
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
  new PostCompile(async () => {
    socket.emit('refresh');
    compressJSON();
    if (!isBrowserExists) {
      isBrowserExists = true;
      await open('http://localhost:9099/stock-shipment');
    }
  }),
];

module.exports = {
  entry: getEntry(),
  plugins,
};
