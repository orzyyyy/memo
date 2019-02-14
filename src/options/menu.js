import React from 'react';

const defaultSelectedKeys = ['3'];
const defaultOpenKeys = ['js'];
const menu = [
  {
    key: 'js',
    title: <span>User</span>,
    children: [
      {
        key: '3',
        value: 'tom',
      },
      { key: '4', value: 'Bill' },
      { key: '5', value: 'Alex' },
    ],
  },
  {
    key: 'js1',
    title: <span>User</span>,
    children: [
      {
        key: '31',
        value: 'tom',
      },
      { key: '41', value: 'Bill' },
      { key: '51', value: 'Alex' },
    ],
  },
];

export { defaultSelectedKeys, defaultOpenKeys, menu };
