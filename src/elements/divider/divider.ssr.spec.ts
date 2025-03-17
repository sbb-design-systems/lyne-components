import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbDividerElement } from './divider.component.js';

describe(`sbb-divider ssr`, () => {
  let root: SbbDividerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-divider></sbb-divider>`, {
      modules: ['./divider.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDividerElement);
  });
});
