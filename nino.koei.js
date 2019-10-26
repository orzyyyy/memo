const path = require('path');

let buildConfig;

switch (process.env.BUILD_ENV) {
  case 'netlify':
    buildConfig = require(path.join(__dirname, './scripts/build-netlify'));
    break;

  case 'business':
    break;

  case 'analyse':
    break;

  case 'gh-pages':
    break;

  case 'dev':
    buildConfig = require(path.join(__dirname, './scripts/build-dev'));
    break;

  default:
    break;
}

module.exports = buildConfig;
