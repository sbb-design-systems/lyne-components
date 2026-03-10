import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCardBadgeElement } from './card-badge.component.ts';

import '../../card.ts';

describe(`sbb-card-badge ssr`, () => {
  let root: SbbCardBadgeElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-card-badge></sbb-card-badge>`, {
      modules: ['../../card.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCardBadgeElement);
  });
});
