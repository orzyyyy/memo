const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];

const extname = (url?: string) => {
  if (!url) {
    return '';
  }
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

export const isImageUrl = (file: any) => {
  if (!file) {
    return false;
  }
  if (file.type && imageTypes.includes(file.type)) {
    return true;
  }
  const url = file.url;
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    return false;
  } else if (extension) {
    return false;
  }
  return true;
};
