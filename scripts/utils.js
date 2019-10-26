const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const handleWithPrefix = (...args) => path.join(__dirname, '../', ...args);

const initMappingFiles = () => {
  const mappingFilePath = handleWithPrefix('src/assets/mapping.json');
  const mappingFile = fs.readJsonSync(mappingFilePath).filter(item => item.visible !== false);
  const assetsFiles = fs.readdirSync(handleWithPrefix('src/assets'));
  const targetFiles = mappingFile.filter(item => !assetsFiles.includes(item.id));
  return targetFiles;
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

module.exports = { handleWithPrefix, compressJSON, initMappingFiles };
