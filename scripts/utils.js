const path = require('path');

const handleWithPrefix = (...args) => path.join(__dirname, '../', ...args);

module.exports = { handleWithPrefix };
