import type { StorybookConfig } from '@storybook/web-components-vite';
import { type BuildOptions, type UserConfig, mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    let build: BuildOptions = {};
    if (process.env.CHROMATIC) {
      build = {
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks(_id) {
              return 'main';
            },
          },
        },
      };
    }

    return mergeConfig(config, <UserConfig>{
      assetsInclude: ['src/**/*.md'],
      build,
    });
  },
};
export default config;
