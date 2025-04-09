import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTagElement } from './tag.component.js';

describe(`sbb-tag ssr`, () => {
  let root: SbbTagElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-tag value="tag">Tag</sbb-tag>`, {
      modules: ['./tag.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTagElement);
  });
});
