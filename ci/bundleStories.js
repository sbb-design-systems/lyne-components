const glob = require('glob');
const esbuild = require('esbuild');

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

glob('./src/components/**/*.stories.js', {}, (err, files) => {
  if (err) {
    throw new Error(`Error reading stories files: ${err}`);
  }

  buildFiles(files);
});
