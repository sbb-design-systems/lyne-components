import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTeaserElement } from './teaser.component.ts';

describe(`sbb-teaser ssr`, () => {
  let root: SbbTeaserElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-teaser id="focus-id" href="#">Content</sbb-teaser>`, {
      modules: ['./teaser.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTeaserElement);
  });
});
