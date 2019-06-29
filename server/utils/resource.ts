const toml = require('toml');
const path = require('path');
const fs = require('fs-extra');

export const getTargetResource = (resourceFileName: string) => {
  const resourceFilePath = path.join(
    process.cwd(),
    'server/resource/',
    resourceFileName + '.toml',
  );
  const resourceFile = fs.readFileSync(resourceFilePath, 'utf-8');
  return toml.parse(resourceFile);
};
