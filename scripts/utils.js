const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const { author, name } = require('../package.json');
const { marked } = require('marked');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildEnv = process.env.BUILD_ENV || 'dev';

const handleWithPrefix = (...args) => path.join(__dirname, '../', ...args);

const rightBar = require(handleWithPrefix('src/assets/rightBar.json'));
const mappingFilePath = handleWithPrefix('src/assets/mapping.json');
const mappingFile = fs.readJsonSync(mappingFilePath).filter(item => item.visible !== false);
const assetsFiles = fs.readdirSync(handleWithPrefix('src/assets'));
const targetFiles = mappingFile.filter(item => !assetsFiles.includes(item.id));

const distPrefix = buildEnv === 'dev' ? 'dist' : '_dist';

const handleWithUtils = () => {
  const templateContent = fs
    .readFileSync(handleWithPrefix('dist/utils/index.html'))
    .toString()
    .replace('../ninoninoni.', '../../ninoninoni.');
  mappingFile
    .filter(item => item.category === 'utils')
    .map(item => {
      const id = item.id;
      fs.ensureDirSync(handleWithPrefix(`${distPrefix}/utils/${id}`));
      fs.outputFileSync(handleWithPrefix(`${distPrefix}/utils/${id}/index.html`), templateContent);
    });
};

const getEntry = () => {
  const common = {
    'markdown-detail': handleWithPrefix('src/router/MarkdownDetailDataController.tsx'),
    'markdown-editor': handleWithPrefix('src/router/MarkdownEditorDataController.tsx'),
    'mapping-detail': handleWithPrefix('src/router/MappingDetailDataController.tsx'),
    'mapping-editor': handleWithPrefix('src/router/MappingDetailDataController.tsx'),
    'util-wrapper': handleWithPrefix('src/router/UtilWrapper.tsx'),
    ninoninoni: handleWithPrefix('src'),
  };
  const result = {
    netlify: common,
    analyse: common,
    'gh-pages': common,
    dev: common,
    private: common,
  };
  return result[buildEnv];
};

const getHtmlPluginProps = customedHtmlWebpackProps => {
  const commonHtmlWebpackProps = {
    template: handleWithPrefix('src/index.html'),
  };

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
  // render for rightBar
  for (const item of rightBar) {
    mainPageProps.push(
      new HtmlWebpackPlugin({
        ...commonHtmlWebpackProps,
        ...customedHtmlWebpackProps,
        filename: `${item.value}/index.html`,
        chunks: ['ninoninoni'],
        title: `${author}'s ${name}`,
        description: `${author}'s ${name}`,
      }),
    );
  }

  const detailPageProps = [];
  const editorPageProps = [];
  const utilsPageProps = [];

  targetFiles.map(({ id, category, title, type, subType, key }) => {
    const commonTemplateProps = {
      title: `${type} - ${subType} - ${title}`,
      description: `${type} - ${subType}`,
    };
    const props = { ...commonHtmlWebpackProps, ...customedHtmlWebpackProps, ...commonTemplateProps };
    switch (category) {
      case 'mapping':
        detailPageProps.push(
          new HtmlWebpackPlugin({ ...props, filename: `${category}/${id}/index.html`, chunks: ['mapping-detail'] }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({ ...props, filename: `mapping-editor/${id}/index.html`, chunks: ['mapping-editor'] }),
        );
        break;

      case 'markdown':
        detailPageProps.push(
          new HtmlWebpackPlugin({ ...props, filename: `${category}/${id}/index.html`, chunks: ['markdown-detail'] }),
        );
        editorPageProps.push(
          new HtmlWebpackPlugin({
            ...props,
            filename: `markdown-editor/${id}/index.html`,
            chunks: ['markdown-editor'],
          }),
        );
        break;

      case 'utils':
        utilsPageProps.push(
          new HtmlWebpackPlugin({
            ...props,
            filename: `utils/${key}/index.html`,
            chunks: ['util-wrapper'],
          }),
        );
        break;

      default:
        break;
    }
  });

  return [...mainPageProps, ...detailPageProps, ...editorPageProps, ...utilsPageProps];
};

const getCopyPluginProps = (shouldCopyExhentai = false) => {
  const assetsFiles = [
    {
      from: handleWithPrefix('src/assets'),
      to: handleWithPrefix(distPrefix + '/assets'),
      globOptions: {
        ignore: ['mapping/*', 'markdown/*', 'exhentai/*'],
      },
    },
  ];
  const exhentaiFiles = shouldCopyExhentai
    ? [
        {
          from: handleWithPrefix('src/assets/exhentai'),
          to: handleWithPrefix(distPrefix + '/assets/exhentai'),
        },
      ]
    : [];
  const documentFiles = [];
  targetFiles.map(({ id, category }) => {
    if (category !== 'utils') {
      const ext = category === 'mapping' ? 'json' : 'md';
      const src = `src/assets/${category}/${id}.${ext}`;
      const dist = `${distPrefix}/${category}/${id}/${id}.${ext}`;
      const distEditor = `${distPrefix}/${category}-editor/${id}/${id}.${ext}`;
      documentFiles.push({
        from: handleWithPrefix(src),
        to: handleWithPrefix(dist),
      });
      documentFiles.push({
        from: handleWithPrefix(src),
        to: handleWithPrefix(distEditor),
      });
    }
  });

  return [...assetsFiles, ...exhentaiFiles, ...documentFiles];
};

const compressJSON = () => {
  glob(distPrefix + '/**/*.json', (error, files) => {
    if (error) {
      throw new Error(error);
    }
    for (const file of files) {
      const targetUrl = handleWithPrefix(file);
      let content = fs.readJsonSync(targetUrl);
      if (Array.isArray(content)) {
        content = content.filter(item => {
          // hide exhentai list online
          const shouldHideExhentaiList = buildEnv === 'dev' ? true : item.key !== 'ex-hentai-module';
          return item.visible !== false && shouldHideExhentaiList;
        });
      }
      fs.outputJsonSync(targetUrl, content, { spaces: 0 });
    }
  });
};

const convertMarkdown2Html = () => {
  glob(distPrefix + '/**/*.md', (error, files) => {
    if (error) {
      throw new Error(error);
    }
    for (const file of files) {
      const targetUrl = handleWithPrefix(file);
      const content = fs.readFileSync(targetUrl).toString();
      const result = file.includes('markdown-editor') ? content : marked.parse(content || '');
      fs.outputFileSync(targetUrl, result);
    }
  });
};

module.exports = {
  compressJSON,
  getCopyPluginProps,
  getHtmlPluginProps,
  getEntry,
  convertMarkdown2Html,
  handleWithUtils,
};
