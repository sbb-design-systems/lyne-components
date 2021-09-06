const {
  h
} = require('jsx-dom');

const readme = require('./readme.md');

export const defaultLink = (args) => <lyne-link
  {...args}
/>;

defaultLink.args = {
  'link': 'https://www.sbb.ch',
  'open-in-new-window': false,
  'text': 'Link text'
};

defaultLink.docsTitle = 'Default Link';

export const openNewWindow = (args) => <lyne-link
  {...args}
/>;

openNewWindow.args = {
  'link': 'https://www.sbb.ch',
  'open-in-new-window': true,
  'text': 'Link text'
};

openNewWindow.docsTitle = 'Open in new window';

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Link'
};
