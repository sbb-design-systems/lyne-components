import { fileURLToPath } from 'node:url';

import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import {
  copyAssets,
  copySass,
  customElementsManifest,
  distDir,
  dts,
  isProdBuild,
  packageJsonTemplate,
  typography,
  verifyEntryPoints,
  generateRootEntryPoint,
  resolveEntryPoints,
} from '../../tools/vite/index.js';
import rootConfig from '../../vite.config.js';

const packageRoot = new URL('.', import.meta.url);
const buildStyleExports = (fileNames: string[]): Record<string, { style: string }> =>
  fileNames.reduce(
    (obj, fileName) => ({
      ...obj,
      [`./${fileName}`]: {
        style: `./${fileName}`,
        default: `./${fileName}`,
      },
    }),
    {},
  );

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: fileURLToPath(packageRoot),
    plugins: [
      ...(config.command === 'build' ? [dts()] : []),
      ...(isProdBuild(config)
        ? [
            customElementsManifest('elements'),
            generateRootEntryPoint(),
            packageJsonTemplate({
              exports: {
                '.': {
                  types: './index.d.ts',
                  sass: './_index.scss',
                  default: './index.js',
                },
                './_index.scss': {
                  sass: './_index.scss',
                  default: './_index.scss',
                },
                ...buildStyleExports([
                  'a11y.css',
                  'animation.css',
                  'badge.css',
                  'core.css',
                  'disable-animation.css',
                  'font-characters-extension.css',
                  'layout.css',
                  'lists.css',
                  'normalize.css',
                  'scrollbar.css',
                  'standard-theme.css',
                  'table.css',
                  'timetable-form.css',
                  'typography.css',
                ]),
              },
            }),
            copyAssets(['_index.scss', '../../README.md']),
            copySass('core/styles'),
            typography(),
            verifyEntryPoints(),
          ]
        : []),
    ],
    build: {
      cssMinify: isProdBuild(config),
      lib: {
        entry: resolveEntryPoints(packageRoot),
        formats: ['es'],
      },
      minify: isProdBuild(config),
      outDir: fileURLToPath(
        new URL(`./elements/${isProdBuild(config) ? '' : 'development/'}`, distDir),
      ),
      emptyOutDir: true,
      sourcemap: isProdBuild(config) ? false : 'inline',
      rollupOptions: {
        external: (source: string, importer: string | undefined) => {
          if (
            source.match(/(^lit$|^lit\/|^@lit\/|^@lit-labs\/|^tslib$)/) ||
            (!!importer && source.startsWith('../') && !importer.includes('/node_modules/'))
          ) {
            if (source.includes('.scss')) {
              throw Error(`Do not import scss from another directory.
               Re export sass via barrel export (index.ts). See button/common.ts.
               Source: ${source}.
               Importer: ${importer}.`);
            }

            return true;
          }
        },
      },
    },
    assetsInclude: ['_index.scss', 'core/styles/**/*.scss', 'README.md'],
  }),
);
