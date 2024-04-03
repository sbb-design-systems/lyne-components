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
      ...(isProdBuild(config) ? [dts(), packageJsonTemplate()] : []),
    ],
    build: {
      lib: {
        formats: ['es'],
      },
      minify: false,
      outDir: new URL('./react/', distDir).pathname,
      emptyOutDir: true,
      rollupOptions: {
        external: [/^@sbb-esta\/lyne-components\/?/, /^@lit\/react\/?/, /^lit\/?/, /^react/],
      },
    },
  }),
);
