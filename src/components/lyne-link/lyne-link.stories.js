import { radios, text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import readme from './readme.md';

const newWindowLabel = 'Open Link in new window';
const newWindowOptions = {
  'Yes': 'true',
  'No': 'false'
};

export const defaultLink = () => <lyne-link
  text={text('text', 'Link text')}
  link={text('link', 'https://www.sbb.ch')}
  open-in-new-window={radios(newWindowLabel, newWindowOptions, 'false')}
/>;

export const openNewWindow = () => <lyne-link
  text={text('text', 'Link text')}
  link={text('link', 'https://www.sbb.ch')}
  open-in-new-window={radios(newWindowLabel, newWindowOptions, 'true')}
/>;

export default {
  decorators: [
    withKnobs
  ],
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
