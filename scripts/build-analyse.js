const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devConfig = require('./build-dev');

devConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = devConfig;
