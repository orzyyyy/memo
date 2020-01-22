export const getPathNameFromUrl = (url?: string): string => {
  let pathName = url || location.pathname;
  if (pathName.endsWith('/')) {
    pathName = pathName.substr(0, pathName.length - 1);
  }
  const id = pathName.substr(pathName.lastIndexOf('/') + 1);
  return id;
};

export const camelCase = (value: string) => {
  return (
    value
      // 形如 a-b 会被替换为 aB
      .replace(/-\w/g, (_, i) => {
        return value.charAt(i + 1).toUpperCase();
      })
      // 首字母大写
      .replace(/^\S/, s => s.toUpperCase())
  );
};
