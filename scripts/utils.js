const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const handleWithPrefix = (...args) => path.join(__dirname, '../', ...args);

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

module.exports = { handleWithPrefix, compressJSON };
