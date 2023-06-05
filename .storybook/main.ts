import type { StorybookConfig } from '@storybook/html-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm',
  ],
  features: {},
  typescript: {
    check: false,
  },
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
