module.exports = {
  stories: ['../src/**/*.stories.jsx', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm',
  ],
  features: {
    postcss: false,
  },
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
