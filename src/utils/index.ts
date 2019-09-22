export const getPathNameFromUrl = (): string => {
  const pathName = location.pathname;
  const id = pathName.substr(pathName.lastIndexOf('/') + 1);
  return id;
};
