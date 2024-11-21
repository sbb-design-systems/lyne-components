import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbCardBadgeElement } from './card-badge.js';

describe(`sbb-card-badge ssr`, () => {
  let root: SbbCardBadgeElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-card-badge></sbb-card-badge>`, {
      modules: ['./card-badge.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCardBadgeElement);
  });
});
