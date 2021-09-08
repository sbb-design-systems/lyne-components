const glob = require('glob');
const esbuild = require('esbuild');
const fs = require('fs');
const config = {
  bundleDir: './dist/collection/storybundle',
  componentsFile: 'components.json',
  componentsGlob: './src/components/**/*.stories.js',
  indexFile: 'index.js',
  storiesFileEnding: '.stories.js'
};

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

        window: JSON.stringify({
          HTMLTemplateElement: {},
          location: {
            href: '/'
          },
          navigator: {
            userAgent: 'gridsome'
          }
        })
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
      outdir: config.bundleDir
    });
};

const writeIndex = () => {
  let moduleExports = '';
  const files = {
    components: []
  };

  fs.readdirSync(config.bundleDir)
    .forEach((file) => {
      const key = file.replace(config.storiesFileEnding, '');

      files.components.push(key);

      moduleExports += `'${key}': require('./${file}'),`;
    });

  const indexOut = `module.exports = {
    ${moduleExports}
  };`;

  // write index file with all commonjs requires
  fs.writeFileSync(`${config.bundleDir}/${config.indexFile}`, indexOut);

  // write index file with all component names
  fs.writeFileSync(`${config.bundleDir}/${config.componentsFile}`, JSON.stringify(files));

};

glob(config.componentsGlob, {}, (err, files) => {
  if (err) {
    throw new Error(`Error reading stories files: ${err}`);
  }

  buildFiles(files);
  writeIndex();
});
