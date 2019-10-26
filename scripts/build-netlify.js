const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const fs = require('fs-extra');
const { author, name } = require('../package.json');
const { handleWithPrefix, compressJSON } = require('./utils');

const initMappingFiles = () => {
  const mappingFilePath = handleWithPrefix('src/assets/mapping.json');
  const mappingFile = fs.readJsonSync(mappingFilePath).filter(item => item.visible !== false);
  const assetsFiles = fs.readdirSync(handleWithPrefix('src/assets'));
  const targetFiles = mappingFile.filter(item => !assetsFiles.includes(item.id));
  return targetFiles;
};

const getCopyPluginProps = mappings => {
  const assetsFiles = [
    {
      from: handleWithPrefix('src/assets'),
      to: handleWithPrefix('dist/assets'),
      ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
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

  return [...assetsFiles, ...documentFiles];
};

const commonHtmlWebpackProps = {
  template: handleWithPrefix('src/index.html'),
  minify: {
    minifyJS: true,
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true,
  },
  environment: '',
  base: '<base href="/" />',
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
        h._hjSettings = { hjid: 1529646, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    </script>
  `,
  googleAnalytics: `
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-150197808-2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-150197808-2');
    </script>
  `,
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
    compressJSON();
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
