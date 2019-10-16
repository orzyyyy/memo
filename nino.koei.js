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
  const mappingFilePath = path.join(__dirname, 'src/assets/mapping.json');
  const mappingFile = fs
    .readJsonSync(mappingFilePath)
    .filter(item => item.visible !== false);

  const targetFiles = mappingFile.filter(
    item => !assetsFiles.includes(item.id),
  );

  if (process.env.BUILD_ENV === 'prod') {
    fs.outputJsonSync(mappingFilePath, mappingFile, {
      spaces: 0,
    });

    const siderFilePath = path.join(__dirname, 'src/assets/sider.json');
    const siderFile = fs.readJsonSync(siderFilePath);
    fs.outputJsonSync(siderFilePath, siderFile, {
      spaces: 0,
    });

    fs.readdirSync(path.join(__dirname, 'src/assets/mapping')).map(item => {
      for (const mapping of mappingFile) {
        if (item.includes(mapping.id)) {
          const mapPath = path.join(__dirname, 'src/assets/mapping', item);
          const mapFile = fs.readJsonSync(mapPath);
          fs.outputJsonSync(mapPath, mapFile, {
            spaces: 0,
          });
        }
      }
    });
  }

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
  environment:
    process.env.BUILD_ENV !== 'prod'
      ? '<script>window.__isLocal = 1;</script>'
      : '',
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
  hotjar:
    process.env.BUILD_ENV === 'prod'
      ? `
      <script>
        (function(h, o, t, j, a, r) {
          h.hj =
            h.hj ||
            function() {
              (h.hj.q = h.hj.q || []).push(arguments);
            };
          h._hjSettings = { hjid: ${
            process.env.PUBLISH_TO === 'github' ? 1529640 : 1529646
          }, hjsv: 6 };
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      </script>
    `
      : '',
  googleAnalytics:
    process.env.BUILD_ENV === 'prod'
      ? `
      <script>
        if (!location.port) {
          // Enable Google Analytics
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'UA-72788897-1');
        }
      </script>`
      : '',
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
      title: "orzyyyy's memo",
      description: "orzyyyy's memo",
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
