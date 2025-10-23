import { resolve } from 'path';

import postcssLit from 'rollup-plugin-postcss-lit';
import { defineConfig } from 'vite';

import { lightDarkPlugin, statePlugin } from './tools/postcss/index.js';
import { typescriptTransform } from './tools/vite/index.js';

export default defineConfig({
  server: { allowedHosts: ['host.containers.internal'] },
  css: {
    postcss: {
      plugins: [lightDarkPlugin, statePlugin],
    },
  },
  plugins: [
    // We apply the postcssLit plugin (which transforms .scss files to Lit
    // CSS tagged templates) as this should apply in almost all cases.
    postcssLit({
      exclude: ['**/core/styles/**/!(box-sizing.scss*)', '**/storybook/**/*'],
    }),
    typescriptTransform(),
  ],
  resolve: {
    // Alias used for test and storybook environments
    alias: [
      { find: '@sbb-esta/lyne-elements', replacement: resolve(__dirname, 'src/elements') },
      {
        find: '@sbb-esta/lyne-elements-experimental',
        replacement: resolve(__dirname, 'src/elements-experimental'),
      },
    ],
  },
});
