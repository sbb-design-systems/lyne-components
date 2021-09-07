const glob = require('glob');
const esbuild = require('esbuild');
const fs = require('fs');

const buildFiles = (files) => {
  esbuild
    .buildSync({
      bundle: true,
      entryNames: '[name]',
      entryPoints: files,
      external: ['jsx-dom'],
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
  let moduleExports = '';

  fs.readdirSync('./dist/collection/storybundle')
    .forEach((file) => {
      const key = file.replace('.stories.js', '');

      moduleExports += `'${key}': require('./${file}'),`;
    });

  // const output = `module.exports = ${JSON.stringify(moduleExports)}`;

  const output = `module.exports = {
    ${moduleExports}
  };`;

  fs.writeFileSync('./dist/collection/storybundle/index.js', output);

};

glob('./src/components/**/*.stories.js', {}, (err, files) => {
  if (err) {
    throw new Error(`Error reading stories files: ${err}`);
  }

  buildFiles(files);
  writeIndex();
});
