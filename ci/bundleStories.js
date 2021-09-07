const glob = require('glob');
const esbuild = require('esbuild');
const fs = require('fs');

const buildFiles = (files) => {
  esbuild
    .build({
      bundle: true,
      entryNames: '[name]',
      entryPoints: files,
      format: 'cjs',
      jsxFactory: 'h',
      loader: {
        '.js': 'jsx',
        '.md': 'text'
      },
      // minify: true,
      outdir: './dist/collection/storybundle'
    })
    .catch((err2) => {
      throw new Error(err2);
    });
};

const writeIndex = () => {
  const moduleExports = {};

  fs.readdirSync('./dist/collection/storybundle')
    .forEach((file) => {
      console.log(file);
      moduleExports[file.replace('.stories.js', '')] = `require('./${file}')`;
    });

};

glob('./src/components/**/*.stories.js', {}, (err, files) => {
  if (err) {
    throw new Error(`Error reading stories files: ${err}`);
  }

  buildFiles(files);
  writeIndex();
});
