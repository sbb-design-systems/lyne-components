const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const jsx = require('jsx-transform');
const components = require('../dist/documentation/jsonDocs.json').components;

const copyPatternsStories = [];

components.forEach((comp) => {

  // copy and transform component story file
  copyPatternsStories.push({
    from: path.resolve(__dirname, `../src/components/${comp.tag}/${comp.tag}.stories.js`),
    to: path.resolve(__dirname, `../dist/collection/components/${comp.tag}/${comp.tag}.stories.js`),
    transform(content, absoluteFrom) {
      return jsx.fromString(content.toString(), {
        factory: 'mercury.h'
      });
    }
  });

  // copy component readme file
  copyPatternsStories.push({
    from: path.resolve(__dirname, `../src/components/${comp.tag}/readme.md`),
    to: path.resolve(__dirname, `../dist/collection/components/${comp.tag}/readme.md`)
  });
});

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
  },
  webpackFinal: async (config, { configType }) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: copyPatternsStories
      }),
    );

    return config;
  },
};
