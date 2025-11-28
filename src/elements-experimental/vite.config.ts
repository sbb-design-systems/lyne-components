import { fileURLToPath } from 'node:url';

import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import {
  copyAssets,
  customElementsManifest,
  distDir,
  dts,
  isProdBuild,
  packageJsonTemplate,
  generateRootEntryPoint,
  verifyEntryPoints,
  resolveEntryPoints,
  stateTransform,
} from '../../tools/vite/index.ts';
import rootConfig from '../../vite.config.ts';

const packageRoot = new URL('.', import.meta.url);

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: fileURLToPath(packageRoot),
    plugins: [
      ...(config.command === 'build' ? [dts()] : []),
      stateTransform(),
      ...(isProdBuild(config)
        ? [
            customElementsManifest('elements-experimental'),
            generateRootEntryPoint(),
            packageJsonTemplate({
              exports: {
                '.': {
                  types: './index.d.ts',
                  default: './index.js',
                },
              },
            }),
            copyAssets(['../../README.md']),
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
        new URL(`./elements-experimental/${isProdBuild(config) ? '' : 'development/'}`, distDir),
      ),
      emptyOutDir: true,
      sourcemap: isProdBuild(config) ? false : 'inline',
      rollupOptions: {
        external: (source: string, importer: string | undefined) => {
          if (
            source.match(
              /(^lit$|^lit\/|^@lit\/|^@lit-labs\/|^tslib$|^@sbb-esta\/lyne-elements\/?)/,
            ) ||
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
    assetsInclude: ['README.md'],
  }),
);
