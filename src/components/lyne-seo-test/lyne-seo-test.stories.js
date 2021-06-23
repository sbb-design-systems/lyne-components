import { h } from 'jsx-dom';
import readme from './readme.md';

export const seoWithShadow = (args) => <lyne-seo-test />;

export default {
  title: 'seoWithShadow',
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
