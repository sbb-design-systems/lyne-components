module.exports = {
  stories: [
    '../src/**/*.stories.js',
    '../src/**/*.stories.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@pxblue/storybook-rtl-addon/register'
  ],
  features: {
    postcss: false
  }
};
