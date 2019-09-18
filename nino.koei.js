const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');
const fs = require('fs-extra');

const assetsFiles = fs.readdirSync(path.join(__dirname, 'src/assets'));
const mappingFile = path.join(__dirname, 'src/assets/mapping.json');
const targetFiles = fs
  .readJsonSync(mappingFile)
  .filter(item => item.visible !== false && !assetsFiles.includes(item.id))
  .map(({ id, category }) => {
    const src = `src/assets/${category}/${id}.${
      category === 'mapping' ? 'json' : 'md'
    }`;
    const dist = `dist/assets/${category}/${id}.${
      category === 'mapping' ? 'json' : 'md'
    }`;

    return {
      from: path.join(__dirname, src),
      to: path.join(__dirname, dist),
    };
  });

const exhentaiFiles = [];
if (process.env.BUILD_ENV !== 'prod') {
  exhentaiFiles.push({
    from: path.join(__dirname, 'src/assets/exhentai'),
    to: path.join(__dirname, 'dist/assets/exhentai'),
  });
}

const plugins = [
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, 'src/assets'),
      to: path.join(__dirname, 'dist/assets'),
      ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
    },
    ...targetFiles,
    ...exhentaiFiles,
  ]),
  new MomentLocalesPlugin({
    localesToKeep: ['es-us', 'zh-cn'],
  }),
];

if (process.env.BUILD_ENV === 'analyse') {
  plugins.push(new BundleAnalyzerPlugin());
}

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
