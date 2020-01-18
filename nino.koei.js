const path = require('path');

module.exports = require(path.join(__dirname, `./scripts/build-${process.env.BUILD_ENV || 'dev'}`));
