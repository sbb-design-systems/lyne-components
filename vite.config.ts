import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

import { lightDarkPlugin, statePlugin } from './tools/postcss/index.ts';
import { typescriptTransform } from './tools/typescript/index.ts';

const projectRoot = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig({
  server: { allowedHosts: ['host.containers.internal'] },
  css: {
    postcss: {
      plugins: [lightDarkPlugin, statePlugin],
    },
  },
  plugins: [typescriptTransform()],
  resolve: {
    // Alias used for test and storybook environments
    alias: [
      { find: '@sbb-esta/lyne-elements', replacement: join(projectRoot, 'src/elements') },
      {
        find: '@sbb-esta/lyne-elements-experimental',
        replacement: join(projectRoot, 'src/elements-experimental'),
      },
    ],
  },
});
