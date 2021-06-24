import { h } from 'jsx-dom';
import readme from './readme.md';

export const seoNoShadow = () => <lyne-seo-test-no-shadow-slot><h1>Default heading</h1><p>Default text</p></lyne-seo-test-no-shadow-slot>;

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
  title: 'seoNoShadowSlot'
};
