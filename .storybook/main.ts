import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import { type UserConfig, mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // We have to use remarkGfm as suggested by storybook docs in order to render markdown tables correctly
            // https://storybook.js.org/docs/writing-docs/mdx#markdown-tables-arent-rendering-correctly
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, <UserConfig>{
      assetsInclude: ['src/**/*.md'],
    });
  },
};
export default config;
