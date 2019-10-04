import fs from 'fs-extra';

fs.ensureDirSync = jest.fn();
fs.ensureFileSync = jest.fn();
fs.createWriteStream = () => ({
  on: (_, callback) => {
    callback();
    return this;
  },
  pipe: callback => {
    callback();
    return this;
  },
  close: jest.fn(),
});
fs.unlinkSync = jest.fn();

module.exports = fs;
