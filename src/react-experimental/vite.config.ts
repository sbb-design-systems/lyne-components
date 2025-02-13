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
      generateReactWrappers(
        '@sbb-esta/lyne-elements-experimental',
        './elements-experimental/custom-elements.json',
        false,
      ),
      ...(config.command === 'build' ? [dts()] : []),
      ...(isProdBuild(config)
        ? [
            packageJsonTemplate({
              templatePath: './package.json',
              exportsExtensions: ['', '.js'],
            }),
            verifyEntryPoints(),
          ]
        : []),
    ],
    build: {
      lib: {
        formats: ['es'],
      },
      minify: isProdBuild(config),
      outDir: fileURLToPath(
        new URL(`./react-experimental/${isProdBuild(config) ? '' : 'development/'}`, distDir),
      ),
      emptyOutDir: true,
      rollupOptions: {
        external: [
          /^@sbb-esta\/lyne-elements\/?/,
          /^@sbb-esta\/lyne-elements-experimental\/?/,
          /^@sbb-esta\/lyne-react\/?/,
          /^@lit\/react\/?/,
          /^lit\/?/,
          /^react/,
          /^tslib$/,
        ],
      },
    },
  }),
);
