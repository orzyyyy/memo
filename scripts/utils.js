const path = require('path');
const fs = require('fs-extra');

const handleWithPrefix = (...args) => path.join(__dirname, '../', ...args);

const compressJSON = (mappingFilePath, mappingFile) => {
  fs.outputJsonSync(mappingFilePath, mappingFile, {
    spaces: 0,
  });
  const siderFilePath = handleWithPrefix('src/assets/sider.json');
  const siderFile = fs.readJsonSync(siderFilePath);
  fs.outputJsonSync(siderFilePath, siderFile, {
    spaces: 0,
  });
  fs.readdirSync(handleWithPrefix('src/assets/mapping')).map(item => {
    for (const mapping of mappingFile) {
      if (item.includes(mapping.id)) {
        const mapPath = handleWithPrefix('src/assets/mapping', item);
        const mapFile = fs.readJsonSync(mapPath);
        fs.outputJsonSync(mapPath, mapFile, {
          spaces: 0,
        });
      }
    }
  });
};

module.exports = { handleWithPrefix, compressJSON };
