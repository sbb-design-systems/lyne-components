import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import {
  distDir,
  dts,
  generateReactWrappers,
  isProdBuild,
  packageJsonTemplate,
} from '../../tools/vite';
import rootConfig from '../../vite.config';

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: new URL('.', import.meta.url).pathname,
    plugins: [
      generateReactWrappers(),
      ...(config.command === 'build' ? [dts()] : []),
      ...(isProdBuild(config) ? [packageJsonTemplate()] : []),
    ],
    build: {
      lib: {
        formats: ['es'],
      },
      minify: isProdBuild(config),
      outDir: new URL(`./react/${isProdBuild(config) ? '' : 'development/'}`, distDir).pathname,
      emptyOutDir: true,
      rollupOptions: {
        external: [/^@sbb-esta\/lyne-components\/?/, /^@lit\/react\/?/, /^lit\/?/, /^react/],
      },
    },
  }),
);
