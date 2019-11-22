const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');
const { getCopyPluginProps, getHtmlPluginProps, compressJSON, getEntry, convertMarkdown2Html } = require('./utils');

const socket = IO('http://localhost:9099');

const commonHtmlWebpackProps = {
  environment: '<script>window.__isLocal = 1;</script>',
  base: '/',
  socket: `
    <script src="https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js"></script>
    <script>
      io('http://localhost:9099').on('refresh', function() {
        location.reload();
      });
    </script>
  `,
  inject: 'body',
  hotjar: '',
  googleAnalytics: '',
};

// Don't merge these plugins into utils, for customed plugins
const copyPluginProps = getCopyPluginProps(true);
const htmlPluginProps = getHtmlPluginProps(commonHtmlWebpackProps);

const plugins = [
  ...htmlPluginProps,
  new CopyWebpackPlugin(copyPluginProps),
  new MomentLocalesPlugin({
    localesToKeep: ['zh-cn'],
  }),
  new PostCompile(() => {
    socket.emit('refresh');
    compressJSON();
    convertMarkdown2Html();
  }),
];

module.exports = {
  entry: getEntry(),
  plugins,
};
