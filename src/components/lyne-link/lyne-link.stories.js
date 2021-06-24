import { h } from 'jsx-dom';
import readme from './readme.md';

export const defaultLink = (args) => <lyne-link
  {...args}
/>;

defaultLink.args = {
  'link': 'https://www.sbb.ch',
  'open-in-new-window': false,
  'text': 'Link text'
};

export const openNewWindow = (args) => <lyne-link
  {...args}
/>;

openNewWindow.args = {
  'link': 'https://www.sbb.ch',
  'open-in-new-window': true,
  'text': 'Link text'
};

export default {
  parameters: {
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Link'
};
