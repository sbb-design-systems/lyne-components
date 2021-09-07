const glob = require('glob');
const esbuild = require('esbuild');
const fs = require('fs');

const buildFiles = (files) => {
  esbuild
    .buildSync({
      bundle: true,
      define: {

        /**
         * since we wanna use it in an SSG tool, we most probably won't have
         * the window context, so we make sure we have no references to window
         * in the bundled code.
         */
        window: '{}'
      },
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
