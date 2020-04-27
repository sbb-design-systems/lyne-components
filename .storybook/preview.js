import { addParameters } from '@storybook/html';
addParameters({ docs: { page: null } });

if (process.env.NODE_ENV !== 'development') {
  import { defineCustomElements } from '../dist/esm/loader.mjs';
  defineCustomElements();
  configure(require.context('../src', true, /.*\.stories\.(js|mdx)$/), module);
}
