import { h } from 'jsx-dom';
import readme from './readme.md';

export const defaultLink = (args) => <lyne-link
  {...args}
/>;

defaultLink.args = {
  text: 'Link text',
  link: 'https://www.sbb.ch',
  'open-in-new-window': false
};

export const openNewWindow = (args) => <lyne-link
  {...args}
/>;

openNewWindow.args = {
  text: 'Link text',
  link: 'https://www.sbb.ch',
  'open-in-new-window': true
};

export default {
  title: 'Link',
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
      extractComponentDescription: () => {
        return readme;
      }
    }
  }
};
