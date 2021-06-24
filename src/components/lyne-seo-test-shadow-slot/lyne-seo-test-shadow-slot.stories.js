import { h } from 'jsx-dom';
import readme from './readme.md';

export const seoWithShadow = () => <lyne-seo-test-shadow-slot><h1>Default heading</h1><p>Default text</p></lyne-seo-test-shadow-slot>;
const foo = 'bar';
export default {
  title: 'seoWithShadowSlot',
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
