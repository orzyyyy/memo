const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');
const fs = require('fs-extra');

const assetsFiles = fs.readdirSync(path.join(__dirname, 'src/assets'));
const mappingFile = path.join(__dirname, 'src/assets/mapping.json');
const targetFiles = fs
  .readJsonSync(mappingFile)
  .filter(item => item.visible !== false && !assetsFiles.includes(item.id));

const copyPluginProps = targetFiles.map(({ id, category }) => {
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

const commonHtmlWebpackProps = {
  template: './src/index.html',
  environment: process.env.BUILD_ENV !== 'prod',
  socket:
    process.env.BUILD_ENV !== 'prod'
      ? `
      <script src="https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js"></script>
      <script>
        io('http://localhost:9099').on('refresh', function() {
          location.reload();
        });
      </script>`
      : '',
  inject: 'body',
  minify: {
    minifyJS: true,
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true,
  },
};

const htmlPluginDetailProps = targetFiles.map(({ id, category }) => {
  const chunks = [];

  switch (category) {
    case 'mapping':
      chunks.push('mapping-detail');
      break;

    case 'markdown':
      chunks.push('markdown-detail');
      chunks.push('markdown-editor');
      break;

    default:
      break;
  }

  return new HtmlWebpackPlugin({
    ...commonHtmlWebpackProps,
    filename: `${category}/${id}/index.html`,
    chunks,
  });
});

const htmlPluginEditorProps = targetFiles.map(({ id, category }) => {
  const chunks = [];

  switch (category) {
    case 'mapping':
      break;

    case 'markdown':
      chunks.push('markdown-editor');
      break;

    default:
      break;
  }

  return new HtmlWebpackPlugin({
    ...commonHtmlWebpackProps,
    filename: `markdown-editor/${id}/index.html`,
    chunks,
  });
});

const exhentaiFiles = [];
if (process.env.BUILD_ENV !== 'prod') {
  exhentaiFiles.push({
    from: path.join(__dirname, 'src/assets/exhentai'),
    to: path.join(__dirname, 'dist/assets/exhentai'),
  });
}

const plugins = [
  ...htmlPluginDetailProps,
  ...htmlPluginEditorProps,
  new HtmlWebpackPlugin({
    ...commonHtmlWebpackProps,
    filename: 'index.html',
    chunks: ['main-page'],
  }),
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, 'src/assets'),
      to: path.join(__dirname, 'dist/assets'),
      ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
    },
    ...copyPluginProps,
    ...exhentaiFiles,
  ]),
  new MomentLocalesPlugin({
    localesToKeep: ['zh-cn'],
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
    'main-page': path.join(
      __dirname,
      'src/controller/MainPageDataController.tsx',
    ),
    'markdown-detail': path.join(
      __dirname,
      'src/controller/MarkdownDetailDataController.tsx',
    ),
    'markdown-editor': path.join(
      __dirname,
      'src/controller/MarkdownEditorDataController.tsx',
    ),
    'mapping-detail': path.join(
      __dirname,
      'src/controller/MappingDetailDataController.tsx',
    ),
  },
  externals: { 'socket.io-client': 'socket.io-client' },
  plugins,
};
