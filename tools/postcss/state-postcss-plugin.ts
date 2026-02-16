/* eslint-disable @typescript-eslint/naming-convention */
import type { Plugin } from 'postcss';

export const statePlugin: Plugin = {
  postcssPlugin: 'state',
  Rule(decl, _helper) {
    if (!decl.selector.includes(':state') || decl.selector.includes('[state--')) {
      return;
    }

    decl.selector = decl.selector.replace(
      /:state\(([\w\-_]+)\)/g,
      (_, m) => `:is(:state(${m}),[state--${m}])`,
    );
  },
};
