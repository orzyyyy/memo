const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const IO = require('socket.io-client');
const { author, name } = require('../package.json');
const { handleWithPrefix, initMappingFiles } = require('./utils');

const getCopyPluginProps = mappings => {
  const assetsFiles = [
    {
      from: handleWithPrefix('src/assets'),
      to: handleWithPrefix('dist/assets'),
      ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
    },
  ];

  const exhentaiFiles = [
    {
      from: handleWithPrefix('src/assets/exhentai'),
      to: handleWithPrefix('dist/assets/exhentai'),
    },
  ];

  const documentFiles = [];
  mappings.map(({ id, category }) => {
    const ext = category === 'mapping' ? 'json' : 'md';
    const src = `src/assets/${category}/${id}.${ext}`;
    const dist = `dist/${category}/${id}/${id}.${ext}`;
    const distEditor = `dist/${category}-editor/${id}/${id}.${ext}`;
    documentFiles.push({
      from: handleWithPrefix(src),
      to: handleWithPrefix(dist),
    });
    documentFiles.push({
      from: handleWithPrefix(src),
      to: handleWithPrefix(distEditor),
    });
  });

  return [...assetsFiles, ...exhentaiFiles, ...documentFiles];
};

const commonHtmlWebpackProps = {
  template: handleWithPrefix('src/index.html'),
  environment: '<script>window.__isLocal = 1;</script>',
  base: '<base href="/" />',
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

const getHtmlPluginProps = mappings => {
  const mainPageProps = [
    new HtmlWebpackPlugin({
      ...commonHtmlWebpackProps,
      filename: 'index.html',
      chunks: ['ninoninoni'],
      title: `${author}'s ${name}`,
      description: `${author}'s ${name}`,
    }),
    new HtmlWebpackPlugin({
      ...commonHtmlWebpackProps,
      filename: 'stock-shipment/index.html',
      chunks: ['stock-shipment'],
      title: `${author}'s business`,
      description: `${author}'s business`,
    }),
  ];
  const detailPageProps = [];
  const editorPageProps = [];

  mappings.map(({ id, category, title, type, subType }) => {
    const commonTemplateProps = {
      title: `${type} - ${subType} - ${title}`,
      description: `${type} - ${subType}`,
    };
    switch (category) {
      case 'mapping':
        detailPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...commonTemplateProps,
            filename: `${category}/${id}/index.html`,
            chunks: ['mapping-detail'],
          }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...commonTemplateProps,
            filename: `mapping-editor/${id}/index.html`,
            chunks: ['mapping-editor'],
          }),
        );
        break;

      case 'markdown':
        detailPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...commonTemplateProps,
            filename: `${category}/${id}/index.html`,
            chunks: ['markdown-detail'],
          }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...commonTemplateProps,
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

const plugins = [
  ...htmlPluginProps,
  new CopyWebpackPlugin([...copyPluginProps]),
  new MomentLocalesPlugin({
    localesToKeep: ['zh-cn'],
  }),
  new PostCompile(() => {
    const socket = IO('http://localhost:9099');
    socket.emit('refresh');
  }),
];

module.exports = {
  entry: {
    'markdown-detail': handleWithPrefix('src/router/MarkdownDetailDataController.tsx'),
    'markdown-editor': handleWithPrefix('src/router/MarkdownEditorDataController.tsx'),
    'mapping-detail': handleWithPrefix('src/router/MappingDetailDataController.tsx'),
    'mapping-editor': handleWithPrefix('src/router/MappingDetailDataController.tsx'),
    'stock-shipment': handleWithPrefix('src/router/StockAndShipmentDataController.tsx'),
    ninoninoni: handleWithPrefix('src'),
  },
  plugins,
};
