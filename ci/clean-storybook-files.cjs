const fs = require('fs');
const path = require('path');
const allowedExtensions =
  'css, gitignore, gitkeep, html, ico, jpg, js, mjs, json, png, scss, stackblitzrc, svg, ts, txt, map, woff2'
    .split(/[, ]+/g)
    .map((e) => `.${e}`);

// Removes all files not matching allowed extensions from given directory.
function clean(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const pathName = path.join(dir, d.name);
    if (d.isDirectory()) {
      clean(pathName);
    } else if (d.isFile() && !allowedExtensions.includes(path.extname(d.name))) {
      console.log(`Removing ${pathName}`);
      fs.unlinkSync(pathName);
    }
  });
}

if (module === require.main) {
  clean(path.resolve('storybook-static'));
}
