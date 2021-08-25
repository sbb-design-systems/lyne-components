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
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Link'
};
