import { h } from 'jsx-dom';
import readme from './readme.md';

export const footer = () => <lyne-footer />;

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
  title: 'Footer'
};
