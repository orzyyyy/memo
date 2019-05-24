const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();

function generate() {
  const files = fs.readdirSync(path.join(cwd, 'src/layout'));
  const layoutFiles = files.filter((file: any) => {
    return file.endsWith('.json');
  });

  const layouts = [];
  for (const fileName of layoutFiles) {
    layouts.push({
      id: fileName.replace('.json', ''),
      title: 'test1',
      thumbnailUrl: 'assets/5795774_0.jpg',
      hoverText: '测试 layout-' + fileName,
      // createTime: new Date().getTime(),
      // modifyTime: new Date().getTime(),
    });
  }

  fs.outputJSON(path.join(process.cwd(), `src/assets/mapping.json`), layouts, {
    spaces: 2,
  })
    .then(() => {
      // tslint:disable-next-line: no-console
      console.log('generate mapping completed');
    })
    .catch((err: any) => {
      console.error(err);
    });
}

module.exports = generate;
