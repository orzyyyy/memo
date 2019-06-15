const fs = require('fs-extra');
const path = require('path');

const unique = target => {
  let result = {};
  target.forEach(function(item) {
    result[JSON.stringify(item)] = item;
  });
  return Object.keys(result).map(item => JSON.parse(item));
};

const writeSiderInfoJson = () => {
  const mappingPath = path.join(process.cwd(), 'src/assets/mapping.json');
  const mappingFile = fs.readFileSync(mappingPath);
  const result = JSON.parse(mappingFile.toString());

  let types = [];
  result.map(item => {
    types.push(item.type);
  });
  types = Array.from(new Set(types));

  let menu = [];
  for (const type of types) {
    menu.push({
      key: type,
      title: type,
      children: [],
    });
  }
  for (const item of result) {
    for (const menuItem of menu) {
      if (menuItem.key === item.type) {
        menuItem.children.push({
          key: item.subType,
          value: item.subType,
        });
      }
    }
  }
  for (const item of menu) {
    item.children = unique(item.children);
  }
  menu = [{ key: 'all', title: 'all' }, ...menu];
  fs.outputJSON(path.join(process.cwd(), 'src/assets/sider.json'), menu, {
    spaces: 2,
  })
    .then(() => {
      console.log('generate menu-sider completed.');
    })
    .catch(err => {
      console.error(err);
    });
};

writeSiderInfoJson();

module.exports = { updateSider: writeSiderInfoJson };
