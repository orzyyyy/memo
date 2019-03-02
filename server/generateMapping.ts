const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();

module.exports = function() {
  const files = fs.readdirSync(path.join(cwd, 'src/layout'));
  const layoutFiles = files.filter((file: string) => {
    return file.endsWith('.json');
  });

  let layouts: Array<any> = [];
  for (let fileName of layoutFiles) {
    layouts.push({
      id: fileName.replace('.json', ''),
      title: 'test1',
      thumbnailUrl: 'dist/assets/5795774_0.jpg',
      hoverText: '测试 layout-' + fileName
      // createTime: new Date().getTime(),
      // modifyTime: new Date().getTime(),
    });
  }

  const writeFiles = ['src/mapping.json', 'dist/mapping.json'];
  try {
    for (let item of writeFiles) {
      fs.pathExists(item, (_: any, exists: boolean) => {
        if (exists) {
          fs.writeFileSync(
            path.join(process.cwd(), item),
            JSON.stringify(layouts)
          );
        }
      });
    }
    // eslint-disable-next-line
    console.log('generate completed.');
  } catch (error) {
    throw Error('generate failed: ' + error);
  }
};

export {};
