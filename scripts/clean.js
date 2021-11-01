const fs = require('fs-extra');
const path = require('path');

const cleanDirs = [
  'dist',
  'css'
];

cleanDirs.forEach((dir) => {
  // eslint-disable-next-line no-undef
  const cleanDir = path.join(__dirname, '../', dir);

  fs.removeSync(cleanDir);
});
