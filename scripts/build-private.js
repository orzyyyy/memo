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
  hotjar: `
    <script>
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1635830,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>
  `,
};

// Don't merge these plugins into utils, for customed plugins
const copyPluginProps = getCopyPluginProps();
const htmlPluginProps = getHtmlPluginProps(commonHtmlWebpackProps);

const plugins = [
  ...htmlPluginProps,
  new CopyWebpackPlugin({ patterns: copyPluginProps }),
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
