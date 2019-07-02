const checkCategory = (category: string) => {
  if (category !== 'mapping' && category !== 'markdown') {
    throw Error('category is neither "mapping" nor "markdown"');
  }
};

export const getWriteFilesPaths = (
  category?: 'markdown' | 'mapping',
  id?: string,
) => {
  if (!id || !category) {
    return [`src/assets/mapping.json`, `dist/assets/mapping.json`];
  }
  checkCategory(category);
  return [
    `src/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
    `dist/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
  ];
};
