import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import { mergeConfig, type UserConfig } from 'vite';

import viteConfig from '../../../vite.config.ts';

const projectRoot = fileURLToPath(new URL('../../../', import.meta.url));

const config: StorybookConfig = {
  stories: ['../../**/*.mdx', '../../**/*.stories.ts'],
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
    config = mergeConfig(config, viteConfig as UserConfig);

    return mergeConfig(config, <UserConfig>{
      root: projectRoot,
      assetsInclude: ['src/**/*.md'],
      build: {
        cssMinify: 'esbuild',
      },
    });
  },
};
export default config;
