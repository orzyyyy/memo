const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const CpuprofileWebpackPlugin = require('cpuprofile-webpack-plugin');
const devConfig = require('./build-netlify');

devConfig.plugins.push(new BundleAnalyzerPlugin());
// devConfig.plugins.push(new CpuprofileWebpackPlugin());

module.exports = devConfig;
