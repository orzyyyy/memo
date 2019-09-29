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

const getCopyPluginProps = mappings => {
  const assetsFiles = [
    {
      from: path.join(__dirname, 'src/assets'),
      to: path.join(__dirname, 'dist/assets'),
      ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
    },
  ];

  const exhentaiFiles = [];
  if (process.env.BUILD_ENV !== 'prod') {
    exhentaiFiles.push({
      from: path.join(__dirname, 'src/assets/exhentai'),
      to: path.join(__dirname, 'dist/assets/exhentai'),
    });
  }

  const documentFiles = [];
  mappings.map(({ id, category }) => {
    const ext = category === 'mapping' ? 'json' : 'md';
    const src = `src/assets/${category}/${id}.${ext}`;
    const dist = `dist/${category}/${id}/${id}.${ext}`;
    const distEditor = `dist/${category}-editor/${id}/${id}.${ext}`;
    documentFiles.push({
      from: path.join(__dirname, src),
      to: path.join(__dirname, dist),
    });
    documentFiles.push({
      from: path.join(__dirname, src),
      to: path.join(__dirname, distEditor),
    });
  });

  return [...assetsFiles, ...exhentaiFiles, ...documentFiles];
};

const commonHtmlWebpackProps = {
  template: './src/index.html',
  environment: process.env.BUILD_ENV !== 'prod',
  base:
    process.env.PUBLISH_TO === 'github'
      ? `<base href="/memo/" />`
      : `<base href="/" />`,
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
      chunks: ['ninoninoni'],
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
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            filename: `mapping-editor/${id}/index.html`,
            chunks: ['mapping-editor'],
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

const plugins = [
  ...htmlPluginProps,
  new CopyWebpackPlugin([...copyPluginProps]),
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
    'markdown-detail': path.join(
      __dirname,
      'src/router/MarkdownDetailDataController.tsx',
    ),
    'markdown-editor': path.join(
      __dirname,
      'src/router/MarkdownEditorDataController.tsx',
    ),
    'mapping-detail': path.join(
      __dirname,
      'src/router/MappingDetailDataController.tsx',
    ),
    'mapping-editor': path.join(
      __dirname,
      'src/router/MappingDetailDataController.tsx',
    ),
    ninoninoni: path.join(__dirname, 'src'),
  },
  plugins,
  output: process.env.PUBLISH_TO === 'github' ? { publicPath: '/memo/' } : {},
};
