const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const OUTPUT_DIR = '../dist';
const PROJECT_NAME = 'lyne-components';

// THIS IS HACKY... We have the issue that live reload is not working for
// css files... Stencil adds <style sty-id="..."></style> for a component
// in the head of the html document.
// The Problem: Storybook's default webpack-plugin
// will extract the style and put it in a generic <style></style> tag.
// Instead of the tag with the id, this tag get's updated by webpack.
// Solution: So removing the forst use-rule from the webpack-config seems to fix
// the issue.
const removeStyleLoaderFile = (rules) => {
  return rules.map((rule) => {
    if (rule.test.toString().indexOf('.css$') !== -1) {
      rule.use.splice(0, 1);
    }
    return rule;
  });
};

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-notes/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],
  // Custom webpack config to tell Storybook where to find the compiled files from Stencil
  async webpackFinal(config) {

    config.module.rules = removeStyleLoaderFile(config.module.rules);

    config.entry.push(path.join(__dirname, OUTPUT_DIR, `${PROJECT_NAME}.js`));
    fs.readdirSync(path.join(__dirname, OUTPUT_DIR, 'collection/components')).map(file => {
      jsFilePath = path.join(__dirname, OUTPUT_DIR, `collection/components/${file}/${file}.js`);
      try {
        if (fs.existsSync(jsFilePath)) {
          config.entry.push(jsFilePath);
        }
      } catch (err) {
        console.error(err);
      }

      // Add CSS
      let cssFilePath = path.join(
        __dirname,
        OUTPUT_DIR,
        `collection/components/${file}/${file}.css`
      );
      try {
        if (fs.existsSync(cssFilePath)) {
          config.entry.push(cssFilePath);
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Add all static files to Storybook
    config.plugins.push(
      new CopyPlugin([
        {
          from: '**/*',
          to: './',
          context: 'dist',
        },
      ])
    );

    // Write the files to disk and not to memory
    config.plugins.push(new WriteFilePlugin());

    return config;
  },
};
