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

fs.createReadStream = jest.fn().mockImplementation(options => {
  if (options.includes('dist/index.html')) {
    return 'dist';
  }
  return { pipe: jest.fn };
});
fs.unlinkSync = jest.fn();
fs.readdirSync = jest
  .fn()
  .mockImplementation(() => [
    '7a9a2d738fa682b6c2b1abc0471616b2',
    '84a65e108e3721e07261e6b3c4336ff1',
  ]);
fs.writeFileSync = jest.fn();
// don't know why, but if mock this function, all test will crash
// with error => Expected "=", [ \t] or [A-Za-z0-9_\-] but end of input found.
// fs.readFileSync = jest.fn().mockImplementation(() => ['readFileSync']);
fs.outputJsonSync = jest.fn();

module.exports = fs;
