import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import {
  distDir,
  dts,
  generateReactWrappers,
  isProdBuild,
  packageJsonTemplate,
} from '../../tools/vite/index.js';
import rootConfig from '../../vite.config.js';

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: new URL('.', import.meta.url).pathname,
    plugins: [
      generateReactWrappers(
        '@sbb-esta/lyne-elements-experimental',
        './elements-experimental/custom-elements.json',
      ),
      ...(config.command === 'build' ? [dts()] : []),
      ...(isProdBuild(config)
        ? [
            packageJsonTemplate({
              templatePath: './experimental.package.json',
              exportsExtensions: ['', '.js'],
            }),
          ]
        : []),
    ],
    build: {
      lib: {
        formats: ['es'],
      },
      minify: isProdBuild(config),
      outDir: new URL(`./react-experimental/${isProdBuild(config) ? '' : 'development/'}`, distDir)
        .pathname,
      emptyOutDir: true,
      rollupOptions: {
        external: [
          /^@sbb-esta\/lyne-elements-experimental\/?/,
          /^@sbb-esta\/lyne-elements\/?/,
          /^@lit\/react\/?/,
          /^lit\/?/,
          /^react/,
        ],
      },
    },
  }),
);
