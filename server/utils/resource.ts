import toml from 'toml';
import path from 'path';
import fs from 'fs-extra';

export const getTargetResource = (resourceFileName: string) => {
  const resourceFilePath = path.join(
    process.cwd(),
    'server/resource/',
    resourceFileName + '.toml',
  );
  const resourceFile = fs.readFileSync(resourceFilePath, 'utf-8');
  const result = toml.parse(resourceFile);
  return result;
};
