import { addParameters } from '@storybook/html';
import { defineCustomElements } from '../dist/esm/loader.mjs';

addParameters({ docs: { page: null } });

if (process.env.NODE_ENV !== 'development') {
  defineCustomElements();
  configure(require.context('../src', true, /.*\.stories\.(js|mdx)$/), module);
}
