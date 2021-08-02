import { h } from 'jsx-dom';
import readme from './readme.md';

export const clock = () => <lyne-clock />;

const themes = {
  control: {
    type: 'radio'
  },
  options: [
    'light',
    'dark'
  ]
};

clock.argTypes = {
  Themes: themes
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
  title: 'Brand Elements/Clock'
};
