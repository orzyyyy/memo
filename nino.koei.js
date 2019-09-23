const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');
const fs = require('fs-extra');

const initMappingFiles = () => {
  const assetsFiles = fs.readdirSync(path.join(__dirname, 'src/assets'));
  const mappingFile = path.join(__dirname, 'src/assets/mapping.json');
  const targetFiles = fs
    .readJsonSync(mappingFile)
    .filter(item => item.visible !== false && !assetsFiles.includes(item.id));
  return targetFiles;
};

const getCopyPluginProps = mappings =>
  mappings.map(({ id, category }) => {
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

const getHtmlPluginProps = mappings => {
  const mainPageProps = [
    new HtmlWebpackPlugin({
      ...commonHtmlWebpackProps,
      filename: 'index.html',
      chunks: ['main-page'],
    }),
  ];
  const detailPageProps = [];
  const editorPageProps = [];

  mappings.map(({ id, category }) => {
    switch (category) {
      case 'mapping':
        detailPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            filename: `${category}/${id}/index.html`,
            chunks: ['mapping-detail'],
          }),
        );
        break;

      case 'markdown':
        detailPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            filename: `${category}/${id}/index.html`,
            chunks: ['markdown-detail'],
          }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            filename: `markdown-editor/${id}/index.html`,
            chunks: ['markdown-editor'],
          }),
        );
        break;

      default:
        break;
    }
  });

  return [...mainPageProps, ...detailPageProps, ...editorPageProps];
};

const readableMappingFiles = initMappingFiles();
const copyPluginProps = getCopyPluginProps(readableMappingFiles);
const htmlPluginProps = getHtmlPluginProps(readableMappingFiles);

const exhentaiFiles = [];
if (process.env.BUILD_ENV !== 'prod') {
  exhentaiFiles.push({
    from: path.join(__dirname, 'src/assets/exhentai'),
    to: path.join(__dirname, 'dist/assets/exhentai'),
  });
}

const plugins = [
  ...htmlPluginProps,
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
