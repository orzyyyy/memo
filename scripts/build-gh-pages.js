const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
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
  base: '/memo/',
  socket: '',
  inject: 'body',
  hotjar: `
    <script>
      (function(h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function() {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 1529640, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    </script>
  `,
  googleAnalytics: `
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-150197808-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-150197808-1');
    </script>
  `,
};

// Don't merge these plugins into utils, for customed plugins
const copyPluginProps = getCopyPluginProps();
const htmlPluginProps = getHtmlPluginProps(commonHtmlWebpackProps);

const plugins = [
  ...htmlPluginProps,
  new CopyWebpackPlugin(copyPluginProps),
  new MomentLocalesPlugin({
    localesToKeep: ['zh-cn'],
  }),
  new PostCompile(() => {
    compressJSON();
    convertMarkdown2Html();
  }),
];

module.exports = {
  entry: getEntry(),
  plugins,
  output: { publicPath: '/memo/' },
};
