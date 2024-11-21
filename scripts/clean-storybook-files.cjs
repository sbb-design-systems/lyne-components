/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs'),
  path = require('path'),
  allowedExtensions =
    /^\.(s?css|html?|m?js|json|ts|map|ico|jpe?g|png|svg|woff2|txt|gitignore|gitkeep|stackblitzrc)$/,
  distDir = path.resolve('dist/storybook');

// Removes all files not matching allowed extensions from given directory.
fs.readdirSync(distDir, { withFileTypes: true, recursive: true })
  .filter((d) => d.isFile() && !allowedExtensions.test(path.extname(d.name)))
  .forEach((d) => {
    console.log(`Removing ${path.join(d.path, d.name)}`);
    fs.unlinkSync(path.join(d.path, d.name));
  });
