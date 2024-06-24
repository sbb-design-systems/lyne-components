import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTeaserElement } from './teaser.js';

describe(`sbb-teaser ssr`, () => {
  let root: SbbTeaserElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-teaser id="focus-id" href="#">Content</sbb-teaser>`, {
      modules: ['./teaser.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserElement);
  });
});
