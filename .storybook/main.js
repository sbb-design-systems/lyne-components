module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y',
  ],
  features: {
    postcss: false
  }
};
