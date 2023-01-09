const fs = require('fs');
const path = require('path');
const allowedExtensions =
  'css, gitignore, gitkeep, html, ico, jpg, js, json, png, scss, stackblitzrc, svg, ts'
    .split(/[, ]+/g)
    .map((e) => `.${e}`);

// Removes all files not matching allowed extensions from given directory.
function clean(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    if (d.isDirectory()) {
      clean(path.join(dir, d.name));
    } else if (d.isFile() && allowedExtensions.includes(path.extname(d.name))) {
      fs.unlinkSync(path.join(dir, d.name));
    }
  });
}

if (module === require.main) {
  clean(path.resolve('storybook-static'));
}
