require('tsx/cjs');
const lyneConfig = require('../../tools/eslint/index.ts');

module.exports = lyneConfig.default ?? lyneConfig;
