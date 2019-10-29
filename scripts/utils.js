const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const { author, name } = require('../package.json');
const marked = require('marked');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildEnv = process.env.BUILD_ENV;

const handleWithPrefix = (...args) => path.join(__dirname, '../', ...args);

const mappingFilePath = handleWithPrefix('src/assets/mapping.json');
const mappingFile = fs.readJsonSync(mappingFilePath).filter(item => item.visible !== false);
const assetsFiles = fs.readdirSync(handleWithPrefix('src/assets'));
const targetFiles = mappingFile.filter(item => !assetsFiles.includes(item.id));

const getEntry = () => {
  const common = {
    'markdown-detail': handleWithPrefix('src/router/MarkdownDetailDataController.tsx'),
    'markdown-editor': handleWithPrefix('src/router/MarkdownEditorDataController.tsx'),
    'mapping-detail': handleWithPrefix('src/router/MappingDetailDataController.tsx'),
    'mapping-editor': handleWithPrefix('src/router/MappingDetailDataController.tsx'),
    'stock-shipment': handleWithPrefix('src/router/StockAndShipmentDataController.tsx'),
    ninoninoni: handleWithPrefix('src'),
  };
  const result = {
    netlify: common,
    analyse: common,
    'gh-pages': common,
    dev: common,
    business: { 'stock-shipment': handleWithPrefix('src/router/StockAndShipmentDataController.tsx') },
  };
  return result[buildEnv];
};

const getHtmlPluginProps = customedHtmlWebpackProps => {
  const commonHtmlWebpackProps = {
    template: handleWithPrefix('src/index.html'),
  };
  const HtmlWebpackPropsForBusiness = new HtmlWebpackPlugin({
    ...commonHtmlWebpackProps,
    ...customedHtmlWebpackProps,
    filename: 'stock-shipment/index.html',
    chunks: ['stock-shipment'],
    title: `${author}'s business`,
    description: `${author}'s business`,
  });
  if (buildEnv === 'business') {
    return [HtmlWebpackPropsForBusiness];
  }

  const mainPageProps = [
    new HtmlWebpackPlugin({
      ...commonHtmlWebpackProps,
      ...customedHtmlWebpackProps,
      filename: 'index.html',
      chunks: ['ninoninoni'],
      title: `${author}'s ${name}`,
      description: `${author}'s ${name}`,
    }),
  ];
  // Build `stock-shipment` only in dev and business
  if (buildEnv === 'dev') {
    mainPageProps.push(HtmlWebpackPropsForBusiness);
  }
  const detailPageProps = [];
  const editorPageProps = [];

  targetFiles.map(({ id, category, title, type, subType }) => {
    const commonTemplateProps = {
      title: `${type} - ${subType} - ${title}`,
      description: `${type} - ${subType}`,
    };
    switch (category) {
      case 'mapping':
        detailPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...customedHtmlWebpackProps,
            ...commonTemplateProps,
            filename: `${category}/${id}/index.html`,
            chunks: ['mapping-detail'],
          }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...customedHtmlWebpackProps,
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
            ...customedHtmlWebpackProps,
            ...commonTemplateProps,
            filename: `${category}/${id}/index.html`,
            chunks: ['markdown-detail'],
          }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...commonHtmlWebpackProps,
            ...customedHtmlWebpackProps,
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

const getCopyPluginProps = (shouldCopyExhentai = false) => {
  const assetsFiles = [
    {
      from: handleWithPrefix('src/assets'),
      to: handleWithPrefix('dist/assets'),
      ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
    },
  ];
  const exhentaiFiles = shouldCopyExhentai
    ? [
        {
          from: handleWithPrefix('src/assets/exhentai'),
          to: handleWithPrefix('dist/assets/exhentai'),
        },
      ]
    : [];
  const documentFiles = [];
  targetFiles.map(({ id, category }) => {
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

const compressJSON = () => {
  glob('dist/**/*.json', (error, files) => {
    if (error) {
      throw new Error(error);
    }
    for (const file of files) {
      const targetUrl = handleWithPrefix(file);
      let content = fs.readJsonSync(targetUrl);
      if (Array.isArray(content)) {
        content = content.filter(item => item.visible !== false);
      }
      fs.outputJsonSync(targetUrl, content, {
        spaces: 0,
      });
    }
  });
};

const convertMarkdown2Html = () => {
  glob('dist/**/*.md', (error, files) => {
    if (error) {
      throw new Error(error);
    }
    for (const file of files) {
      const targetUrl = handleWithPrefix(file);
      const content = fs.readFileSync(targetUrl).toString();
      const result = file.includes('markdown-editor') ? content : marked(content || '');
      fs.outputFileSync(targetUrl, result);
    }
  });
};

module.exports = { compressJSON, getCopyPluginProps, getHtmlPluginProps, getEntry, convertMarkdown2Html };
