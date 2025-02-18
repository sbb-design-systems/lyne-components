import { fileURLToPath } from 'node:url';

import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import {
  distDir,
  dts,
  generateReactWrappers,
  isProdBuild,
  packageJsonTemplate,
  verifyEntryPoints,
} from '../../tools/vite/index.js';
import rootConfig from '../../vite.config.js';

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: fileURLToPath(new URL('.', import.meta.url)),
    plugins: [
      generateReactWrappers('@sbb-esta/lyne-elements', './elements/custom-elements.json'),
      ...(config.command === 'build' ? [dts()] : []),
      ...(isProdBuild(config)
        ? [packageJsonTemplate({ exportsExtensions: ['', '.js'] }), verifyEntryPoints()]
        : []),
    ],
    build: {
      lib: {
        formats: ['es'],
      },
      minify: isProdBuild(config),
      outDir: fileURLToPath(
        new URL(`./react/${isProdBuild(config) ? '' : 'development/'}`, distDir),
      ),
      emptyOutDir: true,
      rollupOptions: {
        external: [
          /^@sbb-esta\/lyne-elements\/?/,
          /^@lit\/react\/?/,
          /^lit\/?/,
          /^react/,
          /^tslib$/,
        ],
      },
    },
  }),
);
