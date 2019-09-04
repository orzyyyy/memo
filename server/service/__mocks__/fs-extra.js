import fs from 'fs-extra';

const ensureDirSync = jest.fn();

fs.ensureDirSync = ensureDirSync;

module.exports = fs;
