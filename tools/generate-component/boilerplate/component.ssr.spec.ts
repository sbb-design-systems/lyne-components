import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { __nameUpperCase__ } from './__noPrefixName__.component.ts';

describe(`__name__ ssr`, () => {
  let root: __nameUpperCase__;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<__name__ my-prop="Label"></__name__>`, {
      modules: ['./__noPrefixName__.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, __nameUpperCase__);
  });
});
