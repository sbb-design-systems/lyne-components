import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTitleElement } from './title.js';

describe(`sbb-title ssr`, () => {
  let root: SbbTitleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-title></sbb-title>`, { modules: ['./title.js'] });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTitleElement);
  });
});
