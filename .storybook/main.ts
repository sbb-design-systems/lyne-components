import { withoutVitePlugins } from '@storybook/builder-vite';
import type { StorybookConfig } from '@storybook/web-components-vite';

const isCIEnvironment = !!process.env.CI;

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      build: {
        ...config.build,
        sourcemap: !isCIEnvironment,
      },
      assetsInclude: ['src/**/*.md'],
      plugins: await withoutVitePlugins(config.plugins, ['vite:dts']),
    };
  },
};
export default config;
