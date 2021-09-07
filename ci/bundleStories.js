const glob = require('glob');
const esbuild = require('esbuild');
const fs = require('fs');

const buildFiles = (files) => {
  esbuild
    .buildSync({
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
    });
};

const writeIndex = () => {
  const moduleExports = {};

  fs.readdirSync('./dist/collection/storybundle')
    .forEach((file) => {
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
