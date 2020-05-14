// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register'
  ]
  // webpackFinal: async (config, {}) => {
  //   config.plugins.push(new BundleAnalyzerPlugin());
  //   return config;
  // }
};
