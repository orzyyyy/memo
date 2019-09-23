export const getPathNameFromUrl = (): string => {
  let pathName = location.pathname;
  if (pathName.endsWith('/')) {
    pathName = pathName.substr(0, pathName.length - 1);
  }
  const id = pathName.substr(pathName.lastIndexOf('/') + 1);
  return id;
};
