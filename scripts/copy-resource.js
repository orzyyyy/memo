const fs = require('fs-extra');
const path = require('path');

fs.copySync(path.join(__dirname, '../server/resource'), path.join(__dirname, '../bin/resource'));
