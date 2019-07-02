export const checkCategory = (category: string) => {
  if (category !== 'mapping' && category !== 'markdown') {
    throw Error('category is neither "mapping" nor "markdown"');
  }
};
