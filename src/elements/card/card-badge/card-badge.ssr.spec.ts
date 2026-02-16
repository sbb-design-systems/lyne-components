import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCardBadgeElement } from './card-badge.component.ts';

describe(`sbb-card-badge ssr`, () => {
  let root: SbbCardBadgeElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-card-badge></sbb-card-badge>`, {
      modules: ['./card-badge.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCardBadgeElement);
  });
});
