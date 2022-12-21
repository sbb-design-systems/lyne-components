module.exports = {
  stories: ['../src/**/*.stories.js', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@brightlayer-ui/storybook-rtl-addon/register',
    'storybook-addon-breakpoints',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  features: {
    postcss: false,
  },
};
