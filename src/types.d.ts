/* eslint-disable @typescript-eslint/no-empty-interface */

/** This is necessary in order to import .md files into our stories. */
declare module '*.md' {
  const src: string;
  export default src;
}

/** This is necessary in order to import .png files into our stories. */
declare module '*.png' {
  const src: string;
  export default src;
}

/**
 * This is an ugly hack, necessary to combine the JSX trees from jsx-dom and Stencil (local).
 * TODO: Check if this can be solved differently in TypeScript 5.1.
 */
declare module 'jsx-dom' {
  export = jsxDom;
  export { h } from '@stencil/core';
}
