const { glob } = require('glob');
const esbuild = require('esbuild');
const fs = require('fs');
const config = {
  bundleDir: './dist/collection/storybundle',
  componentsFile: 'components.json',
  componentsGlob: './src/components/**/*[!.chromatic].stories.jsx',
  indexFile: 'index.js',
  storiesFileEnding: '.stories.jsx',
};

const buildFiles = (files) => {
  esbuild.buildSync({
    bundle: true,
    entryNames: '[name]',
    entryPoints: files,
    format: 'cjs',
    jsxFactory: 'h',
    loader: {
      '.md': 'text',
      '.png': 'binary',
    },
    // minify: true,
    outdir: config.bundleDir,
    target: 'node16',
  });
};

const writeIndex = () => {
  let moduleExports = '';
  const files = {
    components: [],
  };

  fs.readdirSync(config.bundleDir).forEach((file) => {
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

(async () => {
  const files = await glob(config.componentsGlob);

  buildFiles(files);
  writeIndex();
})();
