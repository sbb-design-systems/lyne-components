/* eslint-disable @typescript-eslint/naming-convention */
import type { Plugin } from 'postcss';
import parser from 'postcss-value-parser';

const processed = new WeakSet();

export const lightDarkPlugin: Plugin = {
  postcssPlugin: 'light-dark',
  Declaration(decl, _helper) {
    if (!decl.value.includes('light-dark(') || processed.has(decl)) {
      return;
    }

    processed.add(decl);
    decl.cloneBefore({
      value: parser.stringify(parser(decl.value).nodes, (node) => {
        if (
          node.type === 'function' &&
          node.value === 'light-dark' &&
          node.nodes.length === 3 &&
          node.nodes[1].type === 'div' &&
          node.nodes[1].value === ','
        ) {
          return parser.stringify(node.nodes[0]);
        }
        return parser.stringify(node);
      }),
    });
  },
};
