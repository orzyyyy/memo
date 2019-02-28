const defaultSelectedKeys = 'basic';
const defaultOpenKeys = 'JavaScript';
const menu = [
  {
    key: 'JavaScript',
    title: 'JavaScript',
    children: [
      {
        key: 'basic',
        value: '基础',
      },
      { key: 'react', value: 'react' },
      { key: 'optimization', value: '优化' },
    ],
  },
  {
    key: 'music-theory',
    title: '乐理',
    children: [
      {
        key: 'musical-pitch',
        value: '音律',
      },
    ],
  },
];

export { defaultSelectedKeys, defaultOpenKeys, menu };
